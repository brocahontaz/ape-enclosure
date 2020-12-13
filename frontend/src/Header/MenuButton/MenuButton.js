import React from 'react'

import './MenuButton.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

const MenuButton = ({ click })  =>
  <button className='MenuButton' onClick={() => { console.log('click') 
  click()}}>
    <FontAwesomeIcon icon={icon.faBars}/>
  </button>
  
export default MenuButton