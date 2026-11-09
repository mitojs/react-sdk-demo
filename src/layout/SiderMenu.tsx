import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function SiderMenu() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <aside className='sidebar'>
      <a className='brand' href='#/page-one' aria-label='MitoJS 首页'>
        <span className='brand-symbol'>m</span>
        <span>
          mito<span className='brand-light'>js</span>
        </span>
      </a>
      <div className='sidebar-content'>
        <p className='nav-caption'>SDK PLAYGROUND</p>
        <nav aria-label='演示导航'>
          {[
            { path: '/page-one', title: '异常演示', icon: 'grid' },
            { path: '/page-two', title: '行为轨迹', icon: 'activity' },
          ].map((item) => (
            <button
              key={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
              aria-current={pathname === item.path ? 'page' : undefined}
              onClick={() => navigate(item.path)}
            >
              <Icon name={item.icon} />
              <span>{item.title}</span>
              <Icon name='arrow' className='nav-arrow' />
            </button>
          ))}
        </nav>
        <div className='sidebar-footer'>
          <span className='vue-dot' />
          <span>React 19 集成示例</span>
          <p>让前端问题，有迹可循。</p>
        </div>
      </div>
    </aside>
  )
}
