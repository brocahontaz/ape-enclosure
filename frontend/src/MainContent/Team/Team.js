import React from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

import './Team.css'
import RosterService from 'services/RosterService'
import useSortableData from 'hooks/useSortableData'
import SortButton from 'MainContent/components/SortButton'

const Team = () => {
  const [roster, setRoster] = useState([])
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
      const response = await RosterService.getTeam()
      const rost = await response.data
      setRoster(rost)
      requestSort('rank')
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
      <h2> <FontAwesomeIcon icon={icon.faUsers}/> Raid Team</h2>
      <table>
        <thead>
          <tr>
            <th className='RoName'>
              <SortButton name='Name' sort='name' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoRealm'>
            <SortButton name='Realm' sort='realm' click={requestSort} classSwitch={getClassNamesFor} />
            </th>
            <th className='RoRole'>
              <SortButton name='Role' sort='role' click={requestSort} classSwitch={getClassNamesFor} />
            </th>
            <th className='RoRank'>
              <SortButton name='Rank' sort='rank' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoLvl'>
              <SortButton name='Lvl' sort='level' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoIlvl'>
              <SortButton name='ilvl' sort='itemLevel' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoKey'>
              <SortButton name='Key' sort='weeklyKey' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoCovenant'>
              <SortButton name='Covenant' sort='covenant' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoRenown'>
              <SortButton name='Renown' sort='renown' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
            <th className='RoSoulbind'>
              <SortButton name='Soulbind' sort='activeSoulbind' click={requestSort} classSwitch={getClassNamesFor}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map(character => (
            <tr key={character.id}>
              <td>
                <img src={character.activeSpecIcon} className='PlayerSpecIcon'/>
                <span>{character.name}</span>
              </td>
              <td>{character.realm}</td>
              <td>{character.role}</td>
              <td>{getRank(character.rank)}</td>
              <td>{character.level}</td>
              <td>{character.itemLevel}</td>
              <td>{character.weeklyKey}</td>
              <td>{character.covenant}</td>
              <td>{character.renown}</td>
              <td>{character.activeSoulbind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Team