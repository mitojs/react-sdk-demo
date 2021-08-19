import { Button, Card, Col, message, Row } from 'antd'

enum RequestTypes {
  Xhr = 'Xhr',
  Fetch = 'Fetch',
}
const printMessage = (status: number, responseText: string, requestType: RequestTypes) => {
  if (status === 200) {
    message.success(`${requestType}请求成功：${JSON.parse(responseText).data}`)
  } else {
    message.error(`${requestType}请求失败：${JSON.parse(responseText).data}`)
  }
}
export default function BtnContainer() {
  const onClickNormalXhr = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/normal')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        printMessage(xhr.status, xhr.responseText, RequestTypes.Xhr)
      }
    }
  }
  const onClickAbnormalXhr = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/abnormal')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        printMessage(xhr.status, xhr.responseText, RequestTypes.Xhr)
      }
    }
  }
  const onClickNormalFetch = () => {
    fetch('/normal', {
      method: 'GET',
    }).then(
      res => {
        res.text().then(responseText => {
          printMessage(res.status, responseText, RequestTypes.Fetch)
        })
      },
      err => {
        console.log('err', err)
      }
    )
  }
  const onClickAbnormalFetch = () => {
    fetch('/abnormal', {
      method: 'GET',
    }).then(
      res => {
        res.text().then(responseText => {
          printMessage(res.status, responseText, RequestTypes.Fetch)
        })
      },
      err => {
        console.log('err', err)
      }
    )
  }
  const onClickTriggerUnhandledrejection = async () => {
    const promise = new Promise((resolve, reject) => {
      reject('this is a reject message in Promise')
    })
    await promise
  }
  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col>
          <Button onClick={onClickNormalXhr}>触发正常Xhr</Button>
        </Col>
        <Col>
          <Button onClick={onClickAbnormalXhr}>触发异常Xhr</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalFetch}>触发正常Fetch</Button>
        </Col>
        <Col>
          <Button onClick={onClickAbnormalFetch}>触发异常Fetch</Button>
        </Col>
        <Col>
          <Button onClick={onClickTriggerUnhandledrejection}>触发Promise错误</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalXhr}>触发代码错误</Button>
        </Col>
        <Col>
          <Button onClick={onClickNormalXhr}>路由跳转</Button>
        </Col>
      </Row>
    </Card>
  )
}
