import React from 'react'

import './ContentBox.css'

const ContentBox = ({header, children}) =>
  <div className='ContentBox'>
    {header}
    {children}
  </div>

export default ContentBox