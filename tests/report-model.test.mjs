import assert from 'node:assert/strict'
import { test } from 'node:test'
import { normalizeReport, matchesReport, formatBreadcrumb } from '../src/shared/report-model.js'

const stamp = new Date(2026, 10, 7, 23, 31, 9, 729).getTime()
const http = { authInfo: { sdkVersion: '4.0.0-beta.0' }, data: {
  type: 'HTTP', name: 'fetch--GET', time: stamp, elapsedTime: 16,
  message: 'internal_error http://localhost:2033/vue3-sdk-demo/api/failure',
  request: { method: 'GET', httpType: 'fetch', url: 'http://localhost:2033/vue3-sdk-demo/api/failure' },
  response: { status: 500, data: '{"message":"本地演示服务暂不可用"}' },
  url: 'http://localhost:2033/vue3-sdk-demo/#/scenarios'
}, breadcrumb: [] }
const js = { authInfo: { sdkVersion: '4.0.0-beta.0' }, data: {
  type: 'JAVASCRIPT', name: 'TypeError', message: '读取用户信息失败', time: stamp,
  stack: [{ url: 'http://localhost:2033/assets/app.js', line: 45, column: 9360, func: 'loadUser' }],
  url: 'http://localhost:2033/vue3-sdk-demo/'
}, breadcrumb: [{ type: 'Fetch', data: http.data }] }
const options = { basePath: '/vue3-sdk-demo/' }

test('HTTP rows expose method, short path, status, duration and transport', () => {
  const row = normalizeReport({ id: 7, payload: http }, options)
  assert.equal(row.id, 7)
  assert.equal(row.title, 'GET /api/failure')
  assert.equal(row.location, '本地演示服务暂不可用')
  assert.equal(row.status, '500')
  assert.equal(row.duration, '16 ms')
  assert.equal(row.source, 'Fetch')
  assert.equal(row.time, '23:31:09.729')
  assert.equal(row.isError, true)
  assert.equal(row.raw, http)
})
test('each XHR report retains its own row and does not merge with Fetch', () => {
  const xhr = { ...http, data: { ...http.data, request: { ...http.data.request, httpType: 'xhr' } } }
  assert.equal(normalizeReport({ id: 8, payload: xhr }, options).source, 'XHR')
  assert.equal(normalizeReport({ id: 8, payload: xhr }, options).id, 8)
})
test('network failures retain zero status and zero elapsed time', () => {
  const row = normalizeReport({ payload: { data: { ...http.data, elapsedTime: 0, response: { status: 0 } } } }, options)
  assert.equal(row.status, '0')
  assert.equal(row.duration, '0 ms')
  assert.equal(row.isError, true)
})
test('JavaScript summaries expose the first actual frame and retain the full payload', () => {
  const row = normalizeReport({ id: 0, payload: js })
  assert.equal(row.id, 0)
  assert.equal(row.badge, 'JS')
  assert.equal(row.source, 'TypeError')
  assert.equal(row.location, 'app.js:45:9360')
  assert.equal(row.raw, js)
})
test('Vue string stacks show the component without inventing source locations', () => {
  const row = normalizeReport({ payload: { data: { type: 'VUE', name: 'Error', message: '组件错误(https://vuejs.org/error-reference/#runtime-5)',
    componentName: 'component <VueErrorDemo>', stack: 'Error: 组件错误\n    at r (http://localhost:2033/assets/index.js:45:6294)' } } })
  assert.equal(row.title, '组件错误')
  assert.equal(row.source, 'VueErrorDemo')
  assert.equal(row.location, 'index.js:45:6294')
})
test('manual logs expose custom tags and preserve markup as plain text', () => {
  const row = normalizeReport({ payload: { data: { type: 'LOG', name: 'Mito.log', message: '<img src=x onerror=alert(1)>', customTag: 'release-check' } } })
  assert.equal(row.title, '<img src=x onerror=alert(1)>')
  assert.equal(row.source, 'release-check')
  assert.equal(row.location, 'Mito.log')
})
test('Vue component summaries omit the development file suffix while retaining the payload', () => {
  const payload = { data: { type: 'VUE', message: '组件错误', componentName: 'component <VueErrorDemo> at /project/src/VueErrorDemo.vue' } }
  const row = normalizeReport({ payload })
  assert.equal(row.source, 'VueErrorDemo')
  assert.equal(row.raw, payload)
})
test('HTTP and status search does not match other events through protocols or breadcrumbs', () => {
  const httpRow = normalizeReport({ payload: http }, options)
  const jsRow = normalizeReport({ payload: js })
  assert.equal(matchesReport(httpRow, 'HTTP'), true)
  assert.equal(matchesReport(httpRow, '500'), true)
  assert.equal(matchesReport(httpRow, 'fetch'), true)
  assert.equal(matchesReport(jsRow, 'HTTP'), false)
  assert.equal(matchesReport(jsRow, '500'), false)
  assert.equal(matchesReport(jsRow, 'TYPEERROR'), true)
  assert.equal(matchesReport(jsRow, '  '), true)
})
test('incomplete reports produce readable fallbacks without fabricated fields', () => {
  const row = normalizeReport({ payload: {} })
  assert.equal(row.title, '未知上报')
  assert.equal(row.badge, 'UNKNOWN')
  assert.equal(row.status, '')
  assert.equal(row.duration, '')
  assert.equal(row.time, '—')
})
test('three-digit HTTP status queries do not match stack positions or elapsed times', () => {
  const react = normalizeReport({ payload: { data: { ...js.data, type: 'REACT',
    stack: [{ url: 'http://localhost/assets/app.js', line: 1500, column: 82500 }] } } })
  const otherStatus = normalizeReport({ payload: { data: { ...http.data, elapsedTime: 500, response: { status: 502 } } } })
  assert.equal(matchesReport(react, '500'), false)
  assert.equal(matchesReport(otherStatus, '500'), false)
  assert.equal(matchesReport(otherStatus, '502'), true)
})
test('detail fields include actual full request and SDK version', () => {
  const fields = normalizeReport({ payload: http }, options).fields
  assert.ok(fields.some(field => field.label === '请求' && field.value === 'GET http://localhost:2033/vue3-sdk-demo/api/failure'))
  assert.ok(fields.some(field => field.label === 'SDK 版本' && field.value === '4.0.0-beta.0'))
})
test('behavior entries show readable click and HTTP context', () => {
  assert.equal(formatBreadcrumb({ type: 'UI.Click', data: '<button class="primary">异常 Fetch</button>', time: stamp }).title, '点击「异常 Fetch」')
  const item = formatBreadcrumb({ type: 'Fetch', data: http.data, time: stamp }, options)
  assert.equal(item.title, 'GET /api/failure → 500')
  assert.equal(item.time, '23:31:09.729')
})
