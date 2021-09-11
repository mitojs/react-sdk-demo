import { RouterProps } from 'react-router-dom'
import BtnContainer from './BtnContainer'
import Count from './Count'
import { ErrorBoundary } from '@mitojs/react'
import { Alert, Button, Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { set } from 'msw/lib/types/context'
export default function PageOne(props: RouterProps) {
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false))
  }, [refresh])
  const onError = (error: Error, componentStack: string) => {
    console.log('triggered is render error')
    // console.log(error, componentStack)
  }
  const ErrorFallback = (
    <Card>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Alert message='Oops，触发了render error' type='error'></Alert>
        </Col>
        <Col span={24}>
          <Button type='primary' onClick={() => setRefresh(true)}>
            点击恢复正常
          </Button>
        </Col>
      </Row>
    </Card>
  )

  return (
    <>
      <Count></Count>
      <ErrorBoundary onError={onError} fallback={ErrorFallback}>
        <BtnContainer></BtnContainer>
      </ErrorBoundary>
    </>
  )
}
