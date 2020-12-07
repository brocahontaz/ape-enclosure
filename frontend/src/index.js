import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
//import { Provider } from 'react-redux'
import './index.css'
import App from './App'


ReactDOM.render(
  <React.StrictMode>

      <BrowserRouter>
        <App />
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
)