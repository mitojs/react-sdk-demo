import { Button, Card } from 'antd'
import { useHistory } from 'react-router-dom'

export default function PageTwo() {
  const history = useHistory()
  return (
    <Card>
      <h1>这是实例页面二</h1>
      <Button onClick={() => history.push('/page-one')}>跳转实例页面一</Button>
    </Card>
  )
}
