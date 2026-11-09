import type { ReportId, ReportView } from '../monitoring/reportTypes'
import ReportRow from './ReportRow'

export default function ReportTable({
  reports,
  selectedId,
  onSelect,
}: {
  reports: ReportView[]
  selectedId?: ReportId
  onSelect: (id: ReportId) => void
}) {
  return (
    <>
      <div className='report-monitor__columns' aria-hidden='true'>
        <span>类型</span>
        <span>摘要 / 发生位置</span>
        <span>来源 / 结果</span>
        <span>时间</span>
      </div>
      <div className='report-monitor__list' aria-label='上报记录列表'>
        {reports.map((report) => (
          <ReportRow
            key={report.id}
            report={report}
            selected={report.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  )
}
