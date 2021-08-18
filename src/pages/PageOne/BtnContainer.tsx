import { Button, Card, Col, Row } from 'antd'

export default function BtnContainer() {
  const onClickNormalAjax = () => {}
  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col>
          <Button onClick={onClickNormalAjax}>触发正常ajax</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发异常ajax</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发正常fetch</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发异常fetch</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发promise错误</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发代码错误</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>路由跳转</Button>
        </Col>
      </Row>
    </Card>
  )
}
