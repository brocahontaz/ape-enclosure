import React from 'react'
import { useEffect, useState } from 'react'

import './Roster.css'
import RosterService from 'services/RosterService'

const Roster = () => {
  const [roster, setRoster] = useState([])
  const [test, setTest] = useState('')

  useEffect(() => {
    retrieveRoster()
  }, [])

  const retrieveRoster = async () => {
    try {
      const response = await RosterService.getAll()
      const rost = await response.data
      console.log('rost!', rost)
      setRoster(rost)
      setTest('test')
      console.log('set?', roster)
      console.log('lala', test)
    } catch (err) {
      setRoster(['err'])
    }
  }

  return(
    <div className='Roster'>
      <h2>Roster</h2>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Realm
            </th>
            <th>
              Role
            </th>
            <th>
              Rank
            </th>
            <th>
              Level
            </th>
            <th>
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {roster.map(character => (
            <tr key={character.id}>
              <td>{character.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Roster