import React from 'react'

const RefreshButton = ({action}) =>
  <button className='RefreshButton' onClick={() => action()}>Refresh</button>

export default RefreshButton