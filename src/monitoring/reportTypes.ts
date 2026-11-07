import { normalizeReport } from '../shared/report-model.js'

export type ReportView = ReturnType<typeof normalizeReport>
export type ReportId = ReportView['id']
