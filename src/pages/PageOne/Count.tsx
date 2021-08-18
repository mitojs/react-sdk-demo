import { Button } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

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
export default function Count() {
  const { count, add, sub } = useCount()
  return (
    <div>
      <Button onClick={add} icon={<PlusOutlined />}></Button>
      <Button onClick={sub} icon={<MinusOutlined />}></Button>
    </div>
  )
}
