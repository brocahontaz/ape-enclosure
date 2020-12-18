import React from 'react'
import { useEffect, useState } from 'react'

import './Roster.css'
import RosterService from 'services/RosterService'

const Roster = () => {
  const [roster, setRoster] = useState([])

  const retrieveRoster = async () => {
    try {
      const response = await RosterService.getAll()
      console.log(response.data)
      setRoster(response.data)
    } catch (err) {
      setRoster({error: 'Hoppsan! Denna produkt existerar inte.'})
    }
  }

  useEffect(() => {
    retrieveRoster()
  }, [])

  return(
    <div className='Roster'>
      Roster
    </div>
  )
}


export default Roster