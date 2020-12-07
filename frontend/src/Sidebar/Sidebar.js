import React from 'react'

import './Sidebar.css'

import MenuLink from './components/MenuLink'

const generalNavLinks = [
  {
    name: 'Dashboard',
    url: '/'
  },
  {
    name: 'Roster',
    url: '/roster'
  },
  {
    name: 'Help',
    url: '/help'
  },
  {
    name: 'Settings',
    url: '/settings'
  }
]

const spreadSheetLinks = [
  {
    name: 'Link',
    url: '/spreadsheet'
  },
  {
    name: 'Refresh',
    url: '/spreadsheet/status'
  }
]

const raidLinks = [
  {
    name: 'Calendar',
    url: '/raids/calendar'
  },
  {
    name: 'Statistics',
    url: '/raids/statistics'
  },
  {
    name: 'Wishlist',
    url: '/raids/wishlist'
  }
]

const Sidebar = () =>
  <nav>
    <ul>
      <li className='header'>General</li>
      {generalNavLinks.map(item =>
        <MenuLink text={item.name} url={item.url} />
      )}
      <li className='header'>Spreadsheet</li>
      {spreadSheetLinks.map(item => 
        <MenuLink text={item.name} url={item.url} />
      )}
      <li className='header'>Raids</li>
      {raidLinks.map(item => 
        <MenuLink text={item.name} url={item.url} />
      )}
    </ul>
  </nav>

export default Sidebar