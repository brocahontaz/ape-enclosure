import React from 'react'

import './Characters.css'
import CharacterService from 'services/CharacterService'
import { useEffect, useState } from 'react'
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

const Characters = () => {
  let match = useRouteMatch()

  return(
    <Switch>
      <Route path={`${match.path}/:name`}>
        <Character />
      </Route>   
      <Route path={match.path}>
        Woopsie! Character not found..
      </Route>
    </Switch>
  )
}

const Character = () => {
  let params = useParams()
  const [character, setCharacter] = useState({})

  useEffect(() => {
    retrieveCharacter()
  }, [])

  const retrieveCharacter = async () => {
    try {
      console.log('param', params.name)
      const response = await CharacterService.getCharacter(params.name)
      const char = await response.data
      console.log('ä', char)
      setCharacter(char[0])
    } catch (err) {
      //setRoster(['err'])
    }
  }

  const getTitleAndName = () => {
    const titleString = character.titleDisplay
    let name = character.name
    if (titleString) {
      name = titleString.replace('{name}', name)
    }
    console.log(name)
    return name
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

  const getVaultItems = () => {
    const weeklyRuns = character.keystoneInfo.weeklyHighestRuns
    const first = weeklyRuns[0] ? getVaultItemLvl(weeklyRuns[0].level) : 0 
    const second = weeklyRuns[3] ? getVaultItemLvl(weeklyRuns[3].level) : 0
    const third = weeklyRuns[9] ? getVaultItemLvl(weeklyRuns[9].level) : 0

    return {
      first,
      second,
      third
    }
  }

  const getVaultItemLvl = keyLevel => {
    switch(keyLevel) {
      case 2:
        return 200
      case 3:
        return 203
      case 4:
        return 207
      case 5:
        return 210
      case 6:
        return 210
      case 7:
        return 213
      case 8:
        return 216
      case 9:
        return 216
      case 10:
        return 220
      case 11:
        return 220
      case 12:
        return 223
      case 13:
        return 223
      case 14:
        return 226
      case 15:
        return 226
      default:
        return 0
    }
  }

  // const vaultItems = getVaultItems()

  return(
    <div className='Character'>
      <h2><FontAwesomeIcon icon={icon.faUser}/> {getTitleAndName()}</h2>
      <div className='CharacterName'>
        <span className='CharacterRace'>{character.race} </span> <span className={'CharacterClass ' + character.className}>{character.activeSpec + ' ' + character.className}</span> | {getRank(character.rank)}
      </div>
      <div className='CharacterInfo'>
        <img src={character.icon} className={'CharacterIcon ' + character.className}/>
        <div className='CharacterUpdated'>
          <span><FontAwesomeIcon icon={icon.faSync}/> Last updated: {character.updatedAt}</span>
          <span><FontAwesomeIcon icon={icon.faSignInAlt}/> Last logged in: {character.lastLogin}</span>
        </div>
      </div>
      <h3>Keystones</h3>
      <div className='CharacterKeystones'>
        <div className='CharacterWeeklyHighestRuns'>
          <h4>Weekly Highest</h4>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Level</th>
                <th>Score</th>
                <th>Upgrade</th>
              </tr>
            </thead>
            <tbody>
            {character.keystoneInfo && character.keystoneInfo.weeklyHighestRuns.map(keystone => (
              <tr>
                <th>
                  {keystone.short_name}
                </th>
                <th>
                  {keystone.level}
                </th>
                <th>
                {keystone.score}
                </th>
                <th>
                  + {keystone.upgrade}
                </th>
              </tr>
            ))}
            </tbody>
          </table>
          <ul>
            
          </ul>
        </div>
        <div className='CharacterHighestRuns'>
          <h4>Overall Highest</h4>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Level</th>
                <th>Score</th>
                <th>Upgrade</th>
              </tr>
            </thead>
            <tbody>
            {character.keystoneInfo && character.keystoneInfo.highestRuns.map(keystone => (
              <tr>
                <th>
                  {keystone.short_name}
                </th>
                <th>
                  {keystone.level}
                </th>
                <th>
                {keystone.score}
                </th>
                <th>
                  + {keystone.upgrade}
                </th>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className='CharacterRecentRuns'>
          <h4>Recent Runs</h4>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>
                  Level
                </th>
                <th>Score</th>
                <th>Upgrade</th>
              </tr>
            </thead>
            <tbody>
            {character.keystoneInfo && character.keystoneInfo.recentRuns.map(keystone => (
              <tr>
                <th>
                  {keystone.short_name}
                </th>
                <th>
                  {keystone.level}
                </th>
                <th>
                {keystone.score}
                </th>
                <th>
                  + {keystone.upgrade}
                </th>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3>Vault</h3>
      <div className='CharacterVault'>
        <div className='VaultItem'>
          {character.keystoneInfo && getVaultItems().first}
        </div>
        <div className='VaultItem'>
          {character.keystoneInfo && getVaultItems().second}
        </div>
        <div className='VaultItem'>
          {character.keystoneInfo && getVaultItems().third}
        </div>
      </div>
    </div>
  )
}

export default Characters