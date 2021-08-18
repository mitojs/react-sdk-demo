import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'
import PageOne from '../pages/PageOne'
import PageTwo from '../pages/PageTwo'

const { Content } = Layout
const BaseLayout = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <SiderMenu />
      <Layout>
        <BaseHeader />
        <Content>
          <BrowserRouter>
            <Switch>
              {/* {routes.map(item => ( */}
              <Route key='/page-one' path='/page-one' exact={true} component={PageOne}></Route>
              <Route key='/page-two' path='/page-two' exact={true} component={PageTwo}></Route>
              {/* // ))} */}
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
