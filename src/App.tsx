import './App.css'
import BaseLayout from './layout/BaseLayout'
import { HashRouter, Route, Switch } from 'react-router-dom'
import * as MITO from '@mitojs/web'
MITO.init({
  apikey: 'abc-123',
  dsn: '/upload',
  maxBreadcrumbs: 100,
  debug: true,
  silentConsole: true,
})
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={BaseLayout}></Route>
      </Switch>
    </HashRouter>
  )
}

export default App
