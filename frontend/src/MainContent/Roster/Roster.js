import React from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

import './Roster.css'
import RosterService from 'services/RosterService'
import useSortableData from 'hooks/useSortableData'
import SortButton from './components/SortButton'

const Roster = () => {
  const [roster, setRoster] = useState([])
  const [test, setTest] = useState('')

  const { items, requestSort, sortConfig } = useSortableData(roster)

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction: undefined
  }

  useEffect(() => {
    retrieveRoster()
  }, [])

  const retrieveRoster = async () => {
    try {
      const response = await RosterService.getAll()
      const rost = await response.data
      console.log('rost!', rost)
      const sorted = rost.sort((a, b) => { 
        if (a.rank < b.rank) { return -1 }
        if (a.rank > b.rank) { return 1 }
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

  const getRank = rankId => {
    switch(rankId) {
      case 0:
        return 'GM'
      case 1:
        return 'Officer'
      case 3:
        return 'Raider'
      default:
        return 'Plebeian'
    }
  }

  return(
    <div className='Roster'>
      <h2> <FontAwesomeIcon icon={icon.faUserFriends}/> Roster</h2>
      <table>
        <thead>
          <tr>
            <th className='RoName'>
              <SortButton name='Name' sort='name' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoRealm'>
              Realm
            </th>
            <th className='RoRole'>
              <SortButton name='Role' sort='role' click={requestSort} classSwitch={getClassNamesFor} />
            </th>
            <th className='RoRank'>
              <SortButton name='Rank' sort='rank' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoLvl'>
              <SortButton name='Level' sort='level' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th>
              <SortButton name='Last login' sort='lastLogin' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoUpdated'>
              <SortButton name='Updated' sort='updatedAt' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {roster.filter(character => (character.rank === 0 || character.rank === 1 || character.rank === 3)).map(character => (
            <tr key={character.id}>
              <td>
                <img src={character.activeSpecIcon} className='PlayerSpecIcon'/>
                <span>{character.name}</span>
              </td>
              <td>{character.realm}</td>
              <td>{character.role}</td>
              <td>{getRank(character.rank)}</td>
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