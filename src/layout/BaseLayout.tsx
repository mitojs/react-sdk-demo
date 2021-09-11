import { Redirect, Route, Switch } from 'react-router-dom'
import { Alert, Col, Layout, Row } from 'antd'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'
import IframeBreadcurmb from './IframeBreadcurmb'
const { Content } = Layout

const BaseLayout = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <SiderMenu />
      <Layout>
        <BaseHeader />
        <Content style={{ padding: '10px' }}>
          <Alert message='提示信息' description='右侧的Breadcrumb组件会实时打印的你操作行为。控制台会打印当前收集的信息' type='info' showIcon />
          <Row style={{ padding: '10px 0' }} gutter={[10, 10]}>
            <Col span={8}>
              <Switch>
                {routes.map(item => (
                  <Route key={item.path} path={item.path} component={item.component}></Route>
                ))}
                <Redirect to={{ pathname: routes[0].path }}></Redirect>
              </Switch>
            </Col>
            <Col span={16} style={{ height: '602px' }}>
              <IframeBreadcurmb></IframeBreadcurmb>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
