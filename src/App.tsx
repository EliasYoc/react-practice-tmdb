import './App.css'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import { useMediaQuery } from './hooks/useMediaQuery'
import { mediaQueries } from './utils/helper'

function App(): JSX.Element {
  const matchMdScreen = useMediaQuery(mediaQueries.md)
  return (
    <>
      {!matchMdScreen && <AppHeader />}
      <Outlet />
      {matchMdScreen && <AppHeader />}
      <ScrollRestoration />
    </>
  )
}

export default App
