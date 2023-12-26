import './App.css'
import { Outlet } from 'react-router-dom'
import AppHeader from './components/AppHeader'

function App(): JSX.Element {

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  )
}

export default App
