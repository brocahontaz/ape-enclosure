import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.css'

const generalNavLinks = [
  {
    name: 'dashboard',
    url: '/'
  },
  {
    name: 'roster',
    url: '/roster'
  }

]

const Sidebar = () =>
  <nav>
    <ul>
      <li className='header'>General</li>
      {generalNavLinks.map(item =>
        <li><NavLink to={item.url} className='MenuLink'>{item.name}</NavLink></li>
      )}
    </ul>
  </nav>

export default Sidebar