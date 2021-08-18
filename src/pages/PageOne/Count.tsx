import { Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const useCount = () => {
  const [count, setCount] = useState<number>(0)
  const add = () => {
    setCount(count + 1)
  }
  const sub = () => {
    setCount(count - 1)
  }
  return { count, add, sub }
}
const SpanWrapper = styled.span`
  font-size: 26px;
`
export default function Count() {
  const { count, add, sub } = useCount()
  return (
    <Card>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <SpanWrapper>Count:{count}</SpanWrapper>
        </Col>
        <Button style={{ marginRight: '10px' }} onClick={add} icon={<PlusOutlined />}>
          加
        </Button>
        <Button onClick={sub} icon={<MinusOutlined />}>
          减
        </Button>
      </Row>
    </Card>
  )
}
