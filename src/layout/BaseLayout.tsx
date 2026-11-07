import { Navigate, Route, Routes } from 'react-router-dom'
import { Alert, Col, Layout, Row } from 'antd'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'
import IframeBreadcurmb from './IframeBreadcurmb'
const { Content } = Layout

const BaseLayout = () => {
  return (
    <Layout className='demo-layout'>
      <SiderMenu />
      <Layout className='demo-main'>
        <BaseHeader />
        <Content style={{ padding: '10px' }}>
          <Alert
            title='提示信息'
            description='右侧或下方的Breadcrumb组件会实时打印你的操作行为。控制台会打印当前收集的信息。在控制台输入「MitoInstance」查看当前mito实例'
            type='info'
            showIcon
          />
          <Row style={{ padding: '10px 0' }} gutter={[10, 10]}>
            <Col xs={24} lg={8}>
              <Routes>
                {routes.map(({ path, component: Page }) => (
                  <Route key={path} path={path} element={<Page />} />
                ))}
                <Route path='*' element={<Navigate to={routes[0].path} replace />} />
              </Routes>
            </Col>
            <Col xs={24} lg={16} style={{ height: '602px' }}>
              <IframeBreadcurmb></IframeBreadcurmb>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
