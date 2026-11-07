import { useState } from 'react'
import { ErrorBoundary } from '@mitojs/react'
import { setNotice } from '../monitoring/store'
import Icon from './Icon'

function RenderErrorTrigger() {
  const [failed, setFailed] = useState(false)
  if (failed) throw new Error('is Render error')
  return (
    <button className='scenario-button' onClick={() => setFailed(true)}>
      <Icon name='code' />
      <span>React 组件异常</span>
      <Icon name='arrow' className='trailing' />
    </button>
  )
}

export default function ReactErrorDemo() {
  return (
    <ErrorBoundary
      onError={() => setNotice('React 组件错误已采集，页面可以继续操作。')}
      fallback={
        <div className='react-error-fallback' role='alert'>
          <p>Oops，触发了render error</p>
          <button className='outline-button' onClick={() => location.reload()}>
            点击刷新
          </button>
        </div>
      }
    >
      <RenderErrorTrigger />
    </ErrorBoundary>
  )
}
