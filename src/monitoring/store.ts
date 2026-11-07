export interface BreadcrumbEntry {
  type?: string
  category?: string
  time?: number
  data?: unknown
}

export interface ReportRecord {
  id: number
  receivedAt: number
  payload: {
    authInfo?: Record<string, unknown>
    data: Record<string, unknown>
    breadcrumb?: BreadcrumbEntry[]
    [key: string]: unknown
  }
}

interface MonitoringState {
  reports: ReportRecord[]
  breadcrumbs: BreadcrumbEntry[]
  notice: string
}

let state: MonitoringState = {
  reports: [],
  breadcrumbs: [],
  notice: '选择一个场景，看看 MitoJS 收集了什么。',
}
let nextId = 1
const listeners = new Set<() => void>()

function update(patch: Partial<MonitoringState>) {
  state = { ...state, ...patch }
  listeners.forEach((listener) => listener())
}

export const getMonitoringState = () => state
export function subscribeMonitoring(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

// The MSW receiver invokes this only after reading the real SDK POST body.
export function receiveReport(payload: ReportRecord['payload']) {
  const report = { id: nextId++, receivedAt: Date.now(), payload }
  update({ reports: [report, ...state.reports].slice(0, 50) })
}

export function updateBreadcrumbs(breadcrumbs: BreadcrumbEntry[]) {
  update({ breadcrumbs: [...breadcrumbs].slice(-100) })
}

export function setNotice(notice: string) {
  update({ notice })
}

export function clearRecords() {
  update({ reports: [], breadcrumbs: [], notice: '当前会话记录已清空。' })
}
