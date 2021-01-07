import { TOGGLE_MENU } from './actionTypes'
import { REFRESH_ROSTER } from './actionTypes'
import { REFRESH_TEAM } from './actionTypes'
import { REFRESH_CHARACTER } from './actionTypes'

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

export const refreshRoster = () => ({
  type: REFRESH_ROSTER
})

export const refreshTeam = () => ({
  type: REFRESH_TEAM
})

export const refreshCharacter = () => ({
  type: REFRESH_CHARACTER
})