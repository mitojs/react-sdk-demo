import type { ReportId, ReportView } from '../monitoring/reportTypes'

export default function ReportRow({
  report,
  selected,
  onSelect,
}: {
  report: ReportView
  selected: boolean
  onSelect: (id: ReportId) => void
}) {
  return (
    <button
      className='report-monitor__row'
      aria-pressed={selected}
      data-report-id={report.id}
      onClick={() => onSelect(report.id)}
    >
      <span className='report-monitor__type' data-type={report.type} data-error={String(report.isError)}>
        {report.badge}
      </span>
      <span className='report-monitor__summary'>
        <span className='report-monitor__title'>{report.title}</span>
        <span className='report-monitor__location'>{report.location}</span>
      </span>
      <span className='report-monitor__outcome'>
        <span className='report-monitor__outcome-top'>
          {report.type !== 'HTTP' && <span className='report-monitor__source'>{report.source}</span>}
          {report.status !== '' && report.status != null && (
            <span className='report-monitor__status' data-error={String(report.isError)}>
              {report.status}
            </span>
          )}
          {report.duration && <span className='report-monitor__duration'>{report.duration}</span>}
        </span>
        <span className='report-monitor__source-detail'>{report.type === 'HTTP' ? report.source : report.sourceDetail}</span>
      </span>
      <time className='report-monitor__time'>{report.time}</time>
    </button>
  )
}
