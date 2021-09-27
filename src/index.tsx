import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
const { worker } = require('./mocks/browser')
import { MitoProvider } from '@mitojs/react'
import { BrowserClient, init } from '@mitojs/browser'
const MitoInstance = init({
  apikey: 'abc-123',
  dsn: '/upload',
  maxBreadcrumbs: 100,
  debug: true,
  silentConsole: true,
  enableTraceId: true,
  includeHttpUrlTraceIdRegExp: /.*/,
  // 请求方法为get的时候添加请求头
  beforeAppAjaxSend({ method, url }, config) {
    if (method === 'GET') {
      config.setRequestHeader('get-id', 'mito-get')
    }
  },
})

;(window as any as WindowType).MitoInstance = MitoInstance
MitoInstance.SDK_VERSION
MitoInstance.SDK_NAME
if (process.env.NODE_ENV === 'production') {
  worker.start({
    serviceWorker: {
      url: '/react-sdk-demo/mockServiceWorker.js',
    },
  })
} else {
  worker.start()
}

export interface WindowType extends Window {
  MitoInstance: BrowserClient
}

ReactDOM.render(
  <React.StrictMode>
    <MitoProvider MitoInstance={MitoInstance}>
      <App />
    </MitoProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
