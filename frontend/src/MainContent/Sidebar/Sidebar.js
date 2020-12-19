import React from 'react'
import { connect } from 'react-redux'
import './Sidebar.css'

import MenuLink from './components/MenuLink'

const generalNavLinks = [
  {
    name: 'Dashboard',
    url: '/'
  },
  {
    name: 'Raid team',
    url: '/team'
  },
  {
    name: 'Members',
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

const Sidebar = ({ open }) =>
  <nav className={open ? 'open' : 'closed'}>
    <ul>
      <li className='header' key='menuGeneral'>{open ? 'General' : 'Gnrl'}</li>
      {generalNavLinks.map(item =>
        <MenuLink large={open} text={item.name} url={item.url} key={'menu'+item.name}/>
      )}
      <li className='header' key='menuSpreadsheet'>{open ? 'Spreadsheet' : 'Sheet'}</li>
      {spreadSheetLinks.map(item => 
        <MenuLink large={open} text={item.name} url={item.url} key={'menu'+item.name}/>
      )}
      <li className='header' key='menuRaids'>Raids</li>
      {raidLinks.map(item => 
        <MenuLink large={open} text={item.name} url={item.url} key={'menu'+item.name}/>
      )}
    </ul>
  </nav>

const mapStateToProps = (state) => {
  return {
    open: state.menu.open
  }
}

export default connect(
  mapStateToProps
)(Sidebar)