import './App.css'
import BaseLayout from './layout/BaseLayout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as MITO from './web'
MITO.init({
  apikey: 'abc-123',
  dsn: '/upload',
  maxBreadcrumbs: 100,
  debug: true,
  silentConsole: true,
})
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={BaseLayout}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
