import { Button, Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { RouterProps } from 'react-router-dom'

export default function PageOne(props: RouterProps) {
  console.log('props', props)
  useEffect(() => {
    console.log('effect')
  }, [])
  return (
    <Card title='功能展示'>
      <Row></Row>
    </Card>
  )
}
