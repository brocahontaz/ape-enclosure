import React from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

import './Roster.css'
import RosterService from 'services/RosterService'
import useSortableData from 'hooks/useSortableData'

const Roster = () => {
  const [roster, setRoster] = useState([])
  //const [sortConfig, setSortConfig] = useState(null)
  const [test, setTest] = useState('')

  const { items, requestSort, sortConfig } = useSortableData(roster)

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction: undefined
  }

/*
  if (sortConfig) {
    roster.sort((a,b ) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  const requestSort = key => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({key, direction})
  }*/

  useEffect(() => {
    retrieveRoster()
  }, [])

  const retrieveRoster = async () => {
    try {
      const response = await RosterService.getAll()
      const rost = await response.data
      console.log('rost!', rost)
      const sorted = rost.sort((a, b) => { 
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) { return 1 }
       })
      console.log('sort', sorted)
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
              <button onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
                Name
              </button>
            </th>
            <th className='RoRealm'>
              Realm
            </th>
            <th className='RoRole'>
              <button onClick={() => requestSort('role')} className={getClassNamesFor('role')}>
                Role
              </button>
            </th>
            <th className='RoRank'>
              <button onClick={() => requestSort('rank')} className={getClassNamesFor('rank')}>
                Rank
              </button>
            </th>
            <th className='RoLvl'>
              <button onClick={() => requestSort('level')} className={getClassNamesFor('level')}>
                Level
              </button>
            </th>
            <th>
              <button onClick={() => requestSort('lastLogin')} className={getClassNamesFor('lastLogin')}>
                Last login
              </button>
            </th>
            <th className='RoUpdated'>
              <button onClick={() => requestSort('updatedAt')} className={getClassNamesFor('updatedAt')}>
                Updated
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {roster.filter(character => (character.rank === 0 || character.rank === 1 || character.rank === 2 || character.rank === 4)).map(character => (
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