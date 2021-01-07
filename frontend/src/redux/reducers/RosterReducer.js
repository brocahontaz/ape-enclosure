import { FETCH_ROSTER } from '../actions/actionTypes'
import { REFRESH_ROSTER } from '../actions/actionTypes'
import { FETCH_TEAM } from '../actions/actionTypes'
import { REFRESH_TEAM } from '../actions/actionTypes'
import { REFRESH_CHARACTER } from '../actions/actionTypes'

import RosterService from 'services/RosterService'

const initialState = {
  characters: [],
  team: []
}

const RosterReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ROSTER: {
      console.log('payload', action.payload)
      return {
        ...state,
        characters: action.payload
      }
    }
    case REFRESH_ROSTER: {
      const chars = state.chars

      console.log('refresh')
      const refreshedChars = RosterService.getRoster()

      return {
        ...state,
        characters: refreshedChars
      }
    }
    case FETCH_TEAM: {
      console.log('payload', action.payload)
      return {
        ...state,
        characters: action.payload
      }
    }
    case REFRESH_TEAM: {
      const chars = state.chars

      const refreshedChars = RosterService.getTeam()

      return {
        ...state,
        team: refreshedChars
      }
    }
    case REFRESH_CHARACTER: {

    }
    default: return state
  }
}

export default RosterReducer