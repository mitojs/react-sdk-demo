import { useNavigate } from 'react-router-dom'
import Counter from '../components/Counter'
import Icon from '../components/Icon'

export default function PageTwo() {
  const navigate = useNavigate()
  return (
    <>
      <Counter />
      <article className='card behavior-guide'>
        <div className='guide-icon'>
          <Icon name='stack' />
        </div>
        <h3>把操作连成线</h3>
        <p>点击计数器、切换页面，或回到异常演示发起请求。右侧会按时间展示 SDK 收集的行为。</p>
        <div className='guide-types'>
          <span>点击</span>
          <span>路由</span>
          <span>请求</span>
          <span>异常</span>
        </div>
        <button className='outline-button full-width' onClick={() => navigate('/page-one')}>
          返回异常演示
          <Icon name='arrow' />
        </button>
      </article>
    </>
  )
}
