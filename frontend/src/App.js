import React from 'react'
import { connect } from 'react-redux';
import './App.css'
import Header from 'Header'
import Sidebar from 'Sidebar'
import MainContent from 'MainContent'

const mapStateToProps = (state) => {
  console.log(state)
  return ({open: state.open})
}

const App = connect(mapStateToProps)(({ open }) => (
  <div className='App'>
    <Header />
    <Sidebar />
    <MainContent />
  </div>
))

export default App
