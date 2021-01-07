import RosterService from 'services/RosterService'
import { TOGGLE_MENU } from './actionTypes'
import { FETCH_ROSTER } from './actionTypes'
import { FETCH_TEAM } from './actionTypes'
import { REFRESH_ROSTER } from './actionTypes'
import { REFRESH_TEAM } from './actionTypes'
import { REFRESH_CHARACTER } from './actionTypes'
import { FETCH_ERROR } from './actionTypes'

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

export const refreshRoster = () => async dispatch => {
  try {
    const res = await RosterService.refreshRoster()
    const roster = await RosterService.getRoster()
    dispatch({
      type: REFRESH_ROSTER,
      payload: roster.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
      payload: console.log(err)
    })
  }
}

export const refreshTeam = () => ({
  type: REFRESH_TEAM
})

export const refreshCharacter = () => ({
  type: REFRESH_CHARACTER
})

export const fetchRoster = () => async dispatch => {
  try {
    const res = await RosterService.getRoster()
    dispatch({
      type: FETCH_ROSTER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
      payload: console.log(err)
    })
  }
}

export const fetchTeam = () => async dispatch => {
  try {
    const res = await RosterService.getTeam()
    dispatch({
      type: FETCH_TEAM,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
      payload: console.log(err)
    })
  }
}