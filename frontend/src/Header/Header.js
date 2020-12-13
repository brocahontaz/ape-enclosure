import React from 'react'
import './Header.css'
import Logo from 'components/Logo'
import MenuButton from './MenuButton'
import { connect } from 'react-redux'
import { toggleMenu } from 'redux/actions/actions'

const Header = ({ toggleMenu }) =>
  <div className='Header'>
    <MenuButton click={ toggleMenu }/>
    <Logo />
  </div>

const mapDispatchToProps = { toggleMenu }

export default connect(
  null,
  mapDispatchToProps
)(Header)