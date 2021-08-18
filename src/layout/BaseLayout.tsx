import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'

const { Content } = Layout
const BaseLayout = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <SiderMenu />
      <Layout>
        <BaseHeader />
        <Content>
          <Switch>
            {routes.map(item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))}
            <Redirect to={{ pathname: routes[0].path }}></Redirect>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
