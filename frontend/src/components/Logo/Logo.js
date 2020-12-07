import React from 'react'
import { NavLink } from 'react-router-dom'

import './Logo.css'

const Logo = () =>
  <NavLink to='/' className='LogoLink'>
    <div className='Logo'>
      <span className='name'>Ape Enclosure</span>
      <span className='realm'>Tarren Mill EU</span>
    </div>
  </NavLink> 

export default Logo