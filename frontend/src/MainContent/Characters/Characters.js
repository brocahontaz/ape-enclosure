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

  return(
    <div className='Character'>
      <h2><FontAwesomeIcon icon={icon.faUser}/> {getTitleAndName()}</h2>
      <span className='CharacterRace'>{character.race} </span> <span className='CharacterClass'>{character.activeSpec + ' ' + character.className}</span>
    </div>
  )
}

export default Characters