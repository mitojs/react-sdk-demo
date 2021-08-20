import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
const { worker } = require('./mocks/browser')

if (process.env.NODE_ENV === 'production') {
  worker.start({
    serviceWorker: {
      url: '/react-sdk-demo/mockServiceWorker.js',
    },
  })
} else {
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
