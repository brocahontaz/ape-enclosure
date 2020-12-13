import React from 'react'

import './App.css'
import Header from 'Header'
import Sidebar from 'Sidebar'
import MainContent from 'MainContent'

const App = () => 
  <div className='App'>
    <Header />
    <Sidebar />
    <MainContent />
  </div>

export default App