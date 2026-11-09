import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'
import Icon from '../components/Icon'
import ReportMonitor from '../components/ReportMonitor'
import { useMonitoring } from '../monitoring/useMonitoring'

export default function BaseLayout() {
  const { pathname } = useLocation()
  const behavior = pathname === '/page-two'
  const { reports, breadcrumbs, notice } = useMonitoring()
  return (
    <div className='app-shell'>
      <SiderMenu />
      <div className='workspace'>
        <BaseHeader />
        <main>
          <div className='page-heading'>
            <div>
              <p className='eyebrow'>OBSERVE. UNDERSTAND. IMPROVE.</p>
              <h1>React 19 SDK 演示</h1>
              <p className='page-description'>从一次点击开始，体验前端监控的完整过程。</p>
            </div>
            <span className='ready-indicator'>
              <i />
              本地接收已就绪
            </span>
          </div>
          <div className='info-banner'>
            <Icon name='info' />
            <div>
              <strong>点击左侧场景，实时查看采集结果</strong>
              <p>异常与正常请求都会生成上报记录，点击和页面跳转会留在行为轨迹中。所有演示数据仅在当前浏览器内接收。</p>
            </div>
            <span className='banner-badge'>实时采集</span>
          </div>
          <div className='section-intro'>
            <div>
              <h2>{behavior ? '每一步操作，都有迹可循。' : '试着触发一个场景'}</h2>
              <p>
                {behavior ? '还原异常发生前的点击、请求与页面跳转。' : '选择一种请求或异常，右侧即刻呈现完整上报。'}
              </p>
            </div>
            <span className='section-count'>
              {reports.length} 条上报<span>·</span>
              {breadcrumbs.length} 个行为
            </span>
          </div>
          <div className='demo-grid'>
            <section className='controls-column' aria-label='场景操作'>
              <Routes>
                {routes.map(({ path, component: Page }) => (
                  <Route key={path} path={path} element={<Page />} />
                ))}
                <Route path='*' element={<Navigate to={routes[0].path} replace />} />
              </Routes>
              <p className='operation-notice' role='status'>
                <Icon name='check' />
                <span>{notice}</span>
              </p>
            </section>
            <ReportMonitor behavior={behavior} />
          </div>
          <footer className='page-footer'>
            <span>MitoJS · 让前端问题，有迹可循。</span>
            <a href='https://github.com/mitojs/mitojs' target='_blank' rel='noreferrer'>
              探索 MitoJS
              <Icon name='link' />
            </a>
          </footer>
        </main>
      </div>
    </div>
  )
}
