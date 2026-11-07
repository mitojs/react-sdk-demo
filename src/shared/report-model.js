// Shared, framework-independent demo view model. Keep identical in all three demos.
function object(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}
function text(value) {
  if (value == null) return ''
  if (typeof value === 'object') {
    try { return JSON.stringify(value) } catch (_) { return String(value) }
  }
  return String(value)
}
function pad(value, size) {
  const result = String(value)
  return result.length >= size ? result : new Array(size - result.length + 1).join('0') + result
}
function clock(value) {
  if (value == null || value === '') return '—'
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return '—'
  return pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ':' + pad(date.getSeconds(), 2) + '.' + pad(date.getMilliseconds(), 3)
}
function path(value, basePath) {
  if (!value) return ''
  let result = text(value)
  try { result = new URL(result, 'http://demo.invalid').pathname } catch (_) { /* Keep the supplied path if it is not a URL. */ }
  const base = basePath && basePath !== '/' && basePath !== './' ? String(basePath).replace(/\/$/, '') : ''
  if (base && (result === base || result.indexOf(base + '/') === 0)) result = result.slice(base.length) || '/'
  return result
}
function firstFrame(stack) {
  if (Array.isArray(stack)) {
    const frame = stack.find(item => item && (item.url || item.filename || item.fileName))
    if (!frame) return null
    return { url: text(frame.url || frame.filename || frame.fileName), line: frame.line != null ? frame.line : frame.lineNumber, column: frame.column != null ? frame.column : frame.columnNumber }
  }
  if (typeof stack === 'string') {
    const match = stack.match(/((?:https?|file):\/\/[^\s)]+?):(\d+):(\d+)/)
    if (match) return { url: match[1], line: match[2], column: match[3] }
  }
  return null
}
function frameLocation(frame, full) {
  if (!frame) return ''
  const url = full ? frame.url : path(frame.url).split('/').pop()
  return url + (frame.line != null ? ':' + frame.line : '') + (frame.column != null ? ':' + frame.column : '')
}
function responseMessage(response) {
  let data = response.data
  if (typeof data === 'string') {
    try { data = JSON.parse(data) } catch (_) { /* Plain response text is also useful context. */ }
  }
  const value = object(data)
  return text(value.message || value.error || value.msg || data).slice(0, 240)
}
function field(fields, label, value) {
  if (value !== '' && value != null) fields.push({ label, value: text(value) })
}
export function normalizeReport(record, options) {
  const input = object(record)
  const payload = input.payload && typeof input.payload === 'object' ? input.payload : input
  const data = payload.data && typeof payload.data === 'object' ? object(payload.data) : payload
  const request = object(data.request)
  const response = object(data.response)
  const type = text(data.type).toUpperCase() || 'UNKNOWN'
  const badge = type === 'JAVASCRIPT' ? 'JS' : type
  const frame = firstFrame(data.stack)
  const fullLocation = frameLocation(frame, true)
  let title = text(data.message || data.name) || '未知上报'
  let location = frameLocation(frame, false)
  let source = text(data.name) || '—'
  let sourceDetail
  let status = ''
  let duration = ''
  let isError = ['JAVASCRIPT', 'PROMISE', 'VUE', 'REACT', 'ERROR'].indexOf(type) >= 0
  const fields = []
  if (type === 'HTTP') {
    const method = text(request.method).toUpperCase()
    const pathname = path(request.url, options && options.basePath)
    title = [method, pathname].filter(Boolean).join(' ') || 'HTTP 请求'
    location = responseMessage(response) || text(data.message).replace(/https?:\/\//gi, '')
    const transport = text(request.httpType).toLowerCase()
    source = transport === 'xhr' ? 'XHR' : transport === 'fetch' ? 'Fetch' : transport || 'HTTP'
    sourceDetail = text(data.name)
    if (response.status != null) status = text(response.status)
    if (typeof data.elapsedTime === 'number' && Number.isFinite(data.elapsedTime)) duration = text(data.elapsedTime) + ' ms'
    isError = status !== '' && (Number(status) === 0 || Number(status) >= 400)
    field(fields, '请求', [method, text(request.url)].filter(Boolean).join(' '))
    field(fields, '响应', [status, responseMessage(response)].filter(Boolean).join(' · '))
    field(fields, '来源', [source, sourceDetail].filter(Boolean).join(' · '))
    field(fields, '耗时', duration)
  } else if (type === 'LOG') {
    location = text(data.name) || 'Mito.log'
    source = text(data.customTag || data.tag) || '手动上报'
    sourceDetail = data.customTag || data.tag ? 'customTag' : '日志'
    field(fields, '消息', title)
    field(fields, '标签', data.customTag || data.tag)
    field(fields, '来源', location)
  } else {
    if (type === 'VUE') {
      title = title.replace(/\(https?:\/\/vuejs\.org\/error-reference\/[^)]*\)$/, '')
      const component = text(data.componentName)
      const componentTag = component.match(/<([^>]+)>/)
      source = componentTag ? componentTag[1] : component.replace(/^component\s*/i, '').trim() || 'Vue'
      sourceDetail = text(data.name)
      field(fields, '组件', source)
    } else {
      sourceDetail = type === 'PROMISE' ? '未处理的拒绝' : type === 'REACT' ? '组件渲染异常' : isError ? '代码异常' : ''
    }
    field(fields, '异常', [text(data.name), title].filter(Boolean).join(' · '))
    field(fields, '位置', fullLocation)
  }
  field(fields, '页面', data.url)
  field(fields, 'SDK 版本', object(payload.authInfo).sdkVersion)
  const timestamp = data.time != null ? data.time : input.receivedAt
  const id = input.id != null ? input.id : text(timestamp) + ':' + type
  // Search only this event, excluding nested breadcrumbs and URL protocols.
  const searchText = [type, badge, title, location, source, sourceDetail, request.method, path(request.url, options && options.basePath), status, duration]
    .map(text).join(' ').replace(/https?:\/\//gi, '').toLowerCase()
  return { id, type, badge, title, location, source, sourceDetail, status, isError, duration, timestamp, time: clock(timestamp), fields, raw: payload, searchText }
}
export function matchesReport(report, query) {
  const needle = text(query).trim().toLowerCase()
  if (/^[1-5]\d{2}$/.test(needle)) return !!report && report.type === 'HTTP' && report.status === needle
  return text(report && report.searchText).includes(needle)
}
export function formatBreadcrumb(entry, options) {
  const item = object(entry)
  const data = item.data
  const value = object(data)
  const type = text(item.type) || '行为'
  let title = typeof data === 'string' ? data : text(value.message || value.to || value.url || item.category) || '用户操作'
  let detail = text(item.category)
  if (type === 'UI.Click' && typeof data === 'string') {
    const label = data.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    title = label ? '点击「' + label + '」' : '点击页面元素'
  } else if (value.request) {
    const request = object(value.request)
    const response = object(value.response)
    title = [text(request.method).toUpperCase(), path(request.url, options && options.basePath)].filter(Boolean).join(' ')
    if (response.status != null) title += ' → ' + response.status
    detail = [request.httpType, typeof value.elapsedTime === 'number' ? value.elapsedTime + ' ms' : ''].filter(Boolean).join(' · ')
  } else if (value.from && value.to) {
    title = text(value.from) + ' → ' + text(value.to)
  }
  return { type, category: text(item.category), time: clock(item.time), title, detail, raw: item }
}
