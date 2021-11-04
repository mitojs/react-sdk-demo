import './App.css'
import BaseLayout from './layout/BaseLayout'
import { HashRouter, Route, Switch } from 'react-router-dom'
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
