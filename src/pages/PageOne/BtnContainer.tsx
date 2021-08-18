import { Button, Card, Col, message, Row } from 'antd'

const printMessage = (status: number, responseText: string) => {
  if (status === 200) {
    message.success(`请求成功：${JSON.parse(responseText).data}`)
  } else {
    message.error(`请求失败：${JSON.parse(responseText).data}`)
  }
}
export default function BtnContainer() {
  const onClickNormalAjax = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/normal')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        printMessage(xhr.status, xhr.responseText)
      }
    }
  }
  const onClickAbnormalAjax = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/abnormal')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
    xhr.onreadystatechange = function () {
      console.log(xhr.readyState)
      if (xhr.readyState === 4) {
        printMessage(xhr.status, xhr.responseText)
      }
    }
  }
  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col>
          <Button onClick={onClickNormalAjax}>触发正常Ajax</Button>
        </Col>
        <Col>
          <Button onClick={onClickAbnormalAjax}>触发异常Ajax</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发正常Fetch</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发异常Fetch</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalAjax}>触发Promise错误</Button>
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
