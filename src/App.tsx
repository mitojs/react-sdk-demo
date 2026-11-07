import './App.css'
import BaseLayout from './layout/BaseLayout'
import { App as AntdApp, ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 2 } }}>
      <AntdApp>
        <HashRouter>
          <BaseLayout />
        </HashRouter>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
