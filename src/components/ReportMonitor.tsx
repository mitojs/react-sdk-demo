import { useEffect, useMemo, useState } from 'react'
import { normalizeReport, matchesReport } from '../shared/report-model.js'
import { clearRecords } from '../monitoring/store'
import { useMonitoring } from '../monitoring/useMonitoring'
import type { ReportId } from '../monitoring/reportTypes'
import { MitoInstance } from '../mito'
import Icon from './Icon'
import ReportTable from './ReportTable'
import ReportDetails from './ReportDetails'
import BreadcrumbTimeline from './BreadcrumbTimeline'

export default function ReportMonitor({ behavior }: { behavior: boolean }) {
  const { reports, breadcrumbs } = useMonitoring()
  const [tab, setTab] = useState(behavior ? 'breadcrumbs' : 'reports')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<ReportId | null>(null)
  useEffect(() => {
    setTab(behavior ? 'breadcrumbs' : 'reports')
    setQuery('')
  }, [behavior])
  const normalized = useMemo(
    () => reports.map((report) => normalizeReport(report, { basePath: import.meta.env.BASE_URL })),
    [reports],
  )
  const filtered = normalized.filter((report) => matchesReport(report, query))
  const selected = filtered.find((report) => report.id === selectedId) || filtered[0]
  function switchTab(next: string) {
    setTab(next)
    setQuery('')
  }
  function clear() {
    MitoInstance.breadcrumb.clear()
    clearRecords()
    setSelectedId(null)
    setQuery('')
  }
  return (
    <section className='report-monitor' aria-label='采集结果'>
      <div className='report-monitor__header'>
        <div className='report-monitor__heading'>
          <span className='report-monitor__live-icon'>
            <Icon name='activity' />
          </span>
          <h3>实时观察窗</h3>
          <span className='report-monitor__live-label'>LIVE</span>
        </div>
        <button className='report-monitor__clear' onClick={clear}>
          <Icon name='trash' />
          <span>清空记录</span>
        </button>
      </div>
      <div className='report-monitor__tabs' role='tablist' aria-label='采集结果类型'>
        <button
          className='report-monitor__tab'
          id='reports-tab'
          role='tab'
          aria-selected={tab === 'reports'}
          aria-controls='reports-panel'
          onClick={() => switchTab('reports')}
        >
          上报记录 <span>{reports.length}</span>
        </button>
        <button
          className='report-monitor__tab'
          id='breadcrumbs-tab'
          role='tab'
          aria-selected={tab === 'breadcrumbs'}
          aria-controls='breadcrumbs-panel'
          onClick={() => switchTab('breadcrumbs')}
        >
          行为轨迹 <span>{breadcrumbs.length}</span>
        </button>
      </div>
      <div className='report-monitor__toolbar'>
        <span className='report-monitor__context' aria-live='polite'>
          {tab === 'reports'
            ? `${filtered.length} 条记录 · 本地接收`
            : `${breadcrumbs.length} 个行为 · 当前会话`}
        </span>
        <label className='report-monitor__search'>
          <Icon name='search' />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={tab === 'reports' ? '搜索摘要、状态、来源' : '搜索行为轨迹'}
            aria-label={tab === 'reports' ? '搜索上报记录' : '搜索行为轨迹'}
          />
        </label>
      </div>
      {tab === 'reports' ? (
        <div id='reports-panel' role='tabpanel' aria-labelledby='reports-tab'>
          {!reports.length ? (
            <div className='report-monitor__empty'>
              <span className='report-monitor__empty-icon'>
                <Icon name='stack' />
              </span>
              <h4>还没有上报记录</h4>
              <p>触发左侧任意异常场景，第一条记录就会出现在这里。</p>
              <span className='report-monitor__empty-hint'>等待你的第一次触发</span>
            </div>
          ) : filtered.length ? (
            <>
              <ReportTable reports={filtered} selectedId={selected?.id} onSelect={setSelectedId} />
              {selected && <ReportDetails report={selected} />}
            </>
          ) : (
            <div className='report-monitor__empty'>没有匹配的记录</div>
          )}
        </div>
      ) : (
        <div id='breadcrumbs-panel' role='tabpanel' aria-labelledby='breadcrumbs-tab'>
          <BreadcrumbTimeline breadcrumbs={breadcrumbs} query={query} />
        </div>
      )}
      <footer className='report-monitor__footer'>
        <span>
          mitojs <strong>{MitoInstance.SDK_VERSION}</strong>
        </span>
        <span>数据仅保留在当前浏览器会话</span>
      </footer>
    </section>
  )
}
