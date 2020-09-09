import React from 'react'
import './App.css'
import AppHeader from './AppHeader'
import MainMenu from './MainMenu'
import MainContent from './MainContent'

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

function App() {
  return (
    <div className="App">
      <AppHeader />
      <MainMenu />
      <MainContent />
    </div>
  )
}

export default App;
