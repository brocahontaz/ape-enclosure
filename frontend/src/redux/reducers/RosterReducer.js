import { REFRESH_ROSTER } from '../actions/actionTypes'
import { REFRESH_TEAM } from '../actions/actionTypes'
import { REFRESH_CHARACTER } from '../actions/actionTypes'

import RosterService from 'services/RosterService'

const initialState = {
  characters: []
}

const RosterReducer = (state = initialState, action) => {
  switch(action.type) {
    case REFRESH_ROSTER: {
      const chars = state.chars

      const refreshedChars = RosterService.getRoster()

      return {
        ...state,
        characters: refreshedChars
      }
    }
    case REFRESH_TEAM: {

    }
    case REFRESH_CHARACTER: {

    }
    default: return state
  }
}

export default RosterReducer