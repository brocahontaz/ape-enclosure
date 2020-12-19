import React from 'react'

import './SortButton.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

const SortButton = ({name, sort, click, classSwitch}) => {

  const getActive = direction => {
    const sorting = classSwitch(sort)
    return sorting === direction
  }

  const getActiveClassName = direction => {
    if (getActive(direction)) { return 'activeSort' } else { return '' }
  }

  return ( 
    <button onClick={() => click(sort)} className={'SortButton ' + classSwitch(sort)}>
      {name}
      <div className='SortingIcons'>
        <FontAwesomeIcon icon={icon.faSortUp} className={'SortIcon ' + getActiveClassName('ascending')}/>
        <FontAwesomeIcon icon={icon.faSortDown} className={'SortIcon '  + getActiveClassName('descending')}/>
      </div>
    </button>
  )
}
  
export default SortButton