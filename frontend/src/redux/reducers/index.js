import { combineReducers } from 'redux'
import MenuReducer from './MenuReducer'
import RosterReducer from './RosterReducer'

export default combineReducers({ menu: MenuReducer, roster: RosterReducer })
