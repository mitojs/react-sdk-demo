import { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import routes from '../router/routes'
import { useHistory } from 'react-router-dom'
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
  const { location, push } = useHistory()
  const [curMenu, setCurMenu] = useState<string>('')
  useEffect(() => {
    if (routes.some(item => item.path === location.pathname)) {
      setCurMenu(location.pathname)
    }
  }, [location])
  const handleClick = (value: { key: string }) => {
    push(value.key)
    setCurMenu(value.key)
  }
  return (
    <Sider style={{ backgroundColor: 'white' }}>
      <LogoWrapper>mitojs-react-demo</LogoWrapper>
      <Menu onClick={handleClick} theme='light' mode='inline' selectedKeys={[curMenu]}>
        {routes.map(item => (
          <Menu.Item key={item.path}>{item.meta.title}</Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}
