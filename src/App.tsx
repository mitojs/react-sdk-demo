import './App.css'
import BaseLayout from './layout/BaseLayout'
import { HashRouter } from 'react-router-dom'

export default function App() {
  return (
    <HashRouter>
      <BaseLayout />
    </HashRouter>
  )
}
