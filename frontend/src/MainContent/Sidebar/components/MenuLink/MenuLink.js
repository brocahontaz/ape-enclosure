import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

import './MenuLink.css'

const getIcon = (name) => {
  switch(name) {
    case 'Dashboard':
      return icon.faAnchor
    case 'Raid team':
      return icon.faUsers
    case 'Members':
      return icon.faUserFriends
    case 'Help':
      return icon.faQuestion
    case 'Settings':
      return icon.faCogs
    case 'Link':
      return icon.faLink
    case 'Refresh':
      return icon.faSync
    case 'Calendar':
      return icon.faCalendarDay
    case 'Statistics':
      return icon.faChartBar
    case 'Wishlist':
      return icon.faClipboardList
    default:
      return icon.faBox
  }
}

const MenuLink = ({large, text, url, likey}) =>
  <li className='link'>
    <NavLink exact to={url} className='MenuLink' activeClassName='ActiveLink'>
      <FontAwesomeIcon icon={getIcon(text)} className='MenuIcon'/> {large && text}
    </NavLink>
  </li>

export default MenuLink