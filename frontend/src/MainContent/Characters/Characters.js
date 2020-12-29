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
          <ul>
            {character.keystoneInfo && character.keystoneInfo.weeklyHighestRuns.map(keystone => (
              <li>{keystone.name}</li>
            ))}
          </ul>
        </div>
        <div className='CharacterHighestRuns'>
          <h4>Overall Highest</h4>
          <ul>
            {character.keystoneInfo && character.keystoneInfo.highestRuns.map(keystone => (
              <li>{keystone.name}</li>
            ))}
          </ul>
        </div>
        <div className='CharacterRecentRuns'>
          <h4>Recent Runs</h4>
          <ul>
            {character.keystoneInfo && character.keystoneInfo.recentRuns.map(keystone => (
              <li>{keystone.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='CharacterVault'>
          <h4>Vault</h4>
      </div>
    </div>
  )
}

export default Characters