import { Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { animated, config, useSpring } from 'react-spring'
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
const DivWrapper = styled.span`
  font-size: 26px;
  display: flex;
  justify-content: flex-start;
`
function Number(props: { count: number }) {
  const { number } = useSpring({
    // reset: true,
    // reverse: flip,
    from: { number: 0 },
    number: props.count,
    delay: 200,
    config: config.molasses,
    // onRest: () => set(!flip),
  })

  return <animated.div>{number.to(c => c.toFixed(1))}</animated.div>
}
export default function Count() {
  const { count, add, sub } = useCount()
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <DivWrapper>
            <div>Count: </div>
            <Number count={count}></Number>
          </DivWrapper>
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
