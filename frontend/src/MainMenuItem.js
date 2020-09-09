import React from 'react'
import './MainMenuItem.css'
import {
  Link
} from "react-router-dom";

function MainMenuItem(props) {
  return (
    <li key={props.name + 'li'} className='MainMenuItem'>
      <Link to={'/' + props.name.toLowerCase()} key={props.name + 'link'}>{props.name}</Link>
    </li>
  )
}



export default MainMenuItem;
