import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function PageTwo() {
  const navigate = useNavigate()
  return (
    <Card>
      <h1>这是示例页面二</h1>
      <Button onClick={() => navigate('/page-one')}>跳转实例页面一</Button>
    </Card>
  )
}
