import { Redirect, Route, Switch } from 'react-router-dom'
import { Alert, Layout } from 'antd'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'
import styled from 'styled-components'

const { Content } = Layout
const ContentWrapper = styled(Content)`
  padding: 10px;
`
const BaseLayout = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <SiderMenu />
      <Layout>
        <BaseHeader />
        <ContentWrapper>
          <Alert message='提示信息' description='右边页面会实时打印的你操作行为，控制台会打印当前收集的信息' type='info' showIcon />
          <Switch>
            {routes.map(item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))}
            <Redirect to={{ pathname: routes[0].path }}></Redirect>
          </Switch>
        </ContentWrapper>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
