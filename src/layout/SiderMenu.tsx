import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import routes from '../router/routes'
import { useLocation, useNavigate } from 'react-router-dom'
const { Sider } = Layout
const LogoWrapper = styled.div`
  font-size: 22px;
  width: 100%;
  height: 64px;
  background-color: #1890ff;
  color: white;
  text-align: center;
  line-height: 64px;
`
export default function SiderMenu() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Sider className='demo-sidebar' style={{ backgroundColor: 'white' }}>
      <LogoWrapper>mitojs-react-demo</LogoWrapper>
      <Menu
        onClick={({ key }) => navigate(key)}
        theme='light'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={routes.map(item => ({ key: item.path, label: item.meta.title }))}
      />
    </Sider>
  )
}
