import React from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

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
      <h2> <FontAwesomeIcon icon={icon.faUserFriends}/> Roster</h2>
      <table>
        <thead>
          <tr>
            <th className='RoName'>
              <button onClick={() => setRoster('name')}>
                Name
              </button>
            </th>
            <th className='RoRealm'>
              Realm
            </th>
            <th className='RoRole'>
              <button onClick={() => setRoster('role')}>
                Role
              </button>
            </th>
            <th className='RoRank'>
              <button onClick={() => setRoster('rank')}>
                Rank
              </button>
            </th>
            <th className='RoLvl'>
              <button onClick={() => setRoster('lvl')}>
                Level
              </button>
            </th>
            <th>
              <button onClick={() => setRoster('log')}>
                Last login
              </button>
            </th>
            <th className='RoUpdated'>
              <button onClick={() => setRoster('upd')}>
                Updated
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {roster.filter(character => (character.rank === 1 || character.rank === 2 || character.rank === 4)).map(character => (
            <tr key={character.id}>
              <td>
                <img src={character.activeSpecIcon} className='PlayerSpecIcon'/>
                <span>{character.name}</span>
              </td>
              <td>{character.realm}</td>
              <td>{character.role}</td>
              <td>{character.rank}</td>
              <td>{character.level}</td>
              <td>{character.lastLogin}</td>
              <td>{character.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Roster