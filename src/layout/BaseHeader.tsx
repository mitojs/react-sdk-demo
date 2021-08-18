import { Layout } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import styled from 'styled-components'
const { Header } = Layout
const GithubOutlinedWrapper = styled(GithubOutlined)`
  font-size: 22px;
  cursor: pointer;
`
const HeaderWrapper = styled(Header)`
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const BaseHeader = () => {
  return (
    <HeaderWrapper>
      <GithubOutlinedWrapper onClick={() => window.open('https://github.com/mitojs/mitojs')} />
    </HeaderWrapper>
  )
}

export default BaseHeader
