import { useNavigate } from 'react-router-dom'
import { MitoInstance } from '../mito'
import { setNotice } from '../monitoring/store'
import Counter from './Counter'
import Icon from './Icon'
import ReactErrorDemo from './ReactErrorDemo'

export default function ScenarioControls() {
  const navigate = useNavigate()
  function manualReport() {
    MitoInstance.log({ message: '这是一条来自 React 19 演示的手动上报', tag: 'react19-demo' })
    setNotice('手动上报已触发。')
  }
  function promiseError() {
    void Promise.reject(new Error('Promise 演示异常'))
    setNotice('Promise 异常已触发。')
  }
  function codeError() {
    window.setTimeout(() => {
      throw new Error('JavaScript 演示异常')
    }, 0)
    setNotice('JavaScript 异常已触发。')
  }
  async function fetchRequest(failure: boolean) {
    try {
      const response = await fetch(failure ? '/abnormal' : '/normal')
      const body = await response.json()
      setNotice(`Fetch请求${response.ok ? '成功' : '失败'}：${body.data}`)
    } catch {
      setNotice('Fetch 请求未完成，请重试。')
    }
  }
  function xhrRequest(failure: boolean) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', failure ? '/abnormal' : '/normal')
    xhr.addEventListener('loadend', () => {
      const body = JSON.parse(xhr.responseText)
      setNotice(`XHR请求${xhr.status === 200 ? '成功' : '失败'}：${body.data}`)
    })
    xhr.send()
  }
  return (
    <>
      <Counter />
      <article className='card scenario-card'>
        <div className='card-heading'>
          <h3>异常与上报</h3>
          <span className='tiny-tag'>4 个场景</span>
        </div>
        <p className='card-description'>让问题主动出现，看看它的来龙去脉。</p>
        <div className='scenario-list'>
          <button className='scenario-button primary-scenario' aria-label='手动上报' onClick={manualReport}>
            <Icon name='send' />
            <span>手动上报</span>
            <span className='scenario-pill'>LOG</span>
          </button>
          <ReactErrorDemo />
          <button className='scenario-button' onClick={promiseError}>
            <Icon name='promise' />
            <span>Promise 异常</span>
            <Icon name='arrow' className='trailing' />
          </button>
          <button className='scenario-button' onClick={codeError}>
            <Icon name='bug' />
            <span>JavaScript 异常</span>
            <Icon name='arrow' className='trailing' />
          </button>
        </div>
        <button className='outline-button full-width route-demo-button' onClick={() => navigate('/page-two')}>
          路由跳转
          <Icon name='arrow' />
        </button>
      </article>
      <article className='card request-card'>
        <div className='card-heading'>
          <h3>网络请求</h3>
          <Icon name='request' className='subtle-icon' />
        </div>
        <p className='card-description'>对比正常响应与 HTTP 500 异常。</p>
        <div className='request-grid'>
          <button className='outline-button' onClick={() => void fetchRequest(false)}>
            <span className='button-dot success' />
            正常 Fetch
          </button>
          <button className='outline-button danger-button' onClick={() => void fetchRequest(true)}>
            <span className='button-dot danger' />
            异常 Fetch
          </button>
          <button className='outline-button' onClick={() => xhrRequest(false)}>
            <span className='button-dot success' />
            正常 XHR
          </button>
          <button className='outline-button danger-button' onClick={() => xhrRequest(true)}>
            <span className='button-dot danger' />
            异常 XHR
          </button>
        </div>
      </article>
    </>
  )
}
