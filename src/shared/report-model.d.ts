export interface ReportField { label: string; value: string }
export interface ReportView {
  id: string | number
  type: string
  badge: string
  title: string
  location: string
  source: string
  sourceDetail: string
  status: string
  isError: boolean
  duration: string
  timestamp: number | string | undefined
  time: string
  fields: ReportField[]
  raw: unknown
  searchText: string
}
export interface BreadcrumbView {
  type: string
  category: string
  time: string
  title: string
  detail: string
  raw: unknown
}
export function normalizeReport(record: unknown, options?: { basePath?: string }): ReportView
export function matchesReport(report: ReportView, query: string): boolean
export function formatBreadcrumb(entry: unknown, options?: { basePath?: string }): BreadcrumbView
