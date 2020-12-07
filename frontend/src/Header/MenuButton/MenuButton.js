import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

const MenuButton = () =>
  <button className='MenuButton' onClick={() => click(!open)}>
    <FontAwesomeIcon icon={icon.faHamburger}/>
  </button>
  
export default MenuButton