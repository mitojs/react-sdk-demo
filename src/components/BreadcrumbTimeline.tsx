import { formatBreadcrumb } from '../shared/report-model.js'
import type { BreadcrumbEntry } from '../monitoring/store'

export default function BreadcrumbTimeline({
  breadcrumbs,
  query,
}: {
  breadcrumbs: BreadcrumbEntry[]
  query: string
}) {
  const entries = [...breadcrumbs]
    .reverse()
    .map((entry) => formatBreadcrumb(entry, { basePath: import.meta.env.BASE_URL }))
    .filter((entry) =>
      `${entry.type} ${entry.category} ${entry.title} ${entry.detail}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
  if (!entries.length)
    return (
      <div className='report-monitor__empty'>
        {query ? '没有匹配的轨迹' : '还没有行为轨迹，试着点击左侧计数器。'}
      </div>
    )
  return (
    <ol className='report-monitor__timeline' aria-label='行为轨迹列表'>
      {entries.map((entry, index) => (
        <li className='report-monitor__timeline-entry' key={`${entry.time}-${index}`}>
          <time>{entry.time}</time>
          <span className='report-monitor__timeline-mark' />
          <div>
            <div className='report-monitor__timeline-title'>{entry.title}</div>
            <p className='report-monitor__timeline-detail'>{entry.detail}</p>
            <span className='report-monitor__timeline-category'>
              {entry.type} · {entry.category}
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}
