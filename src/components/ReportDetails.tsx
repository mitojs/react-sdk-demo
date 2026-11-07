import { Fragment } from 'react'
import type { ReportView } from '../monitoring/reportTypes'

export default function ReportDetails({ report }: { report: ReportView }) {
  return (
    <section className='report-monitor__details' aria-label='选中记录详情'>
      <div className='report-monitor__detail-heading'>
        <div className='report-monitor__detail-title'>
          <span className='report-monitor__eyebrow'>已选记录 · {report.badge}</span>
          <strong>{report.title}</strong>
        </div>
        <span className='report-monitor__detail-status'>
          已本地接收
          {report.status !== '' && report.status != null && (
            <>
              {' '}
              · <b>{report.status}</b>
            </>
          )}
        </span>
      </div>
      <dl className='report-monitor__fields'>
        {report.fields.map((field, index) => (
          <Fragment key={`${field.label}-${index}`}>
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </Fragment>
        ))}
      </dl>
      <details className='report-monitor__json' key={report.id}>
        <summary>完整 JSON</summary>
        <pre>{JSON.stringify(report.raw, null, 2)}</pre>
      </details>
    </section>
  )
}
