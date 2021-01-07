import http from 'http-common'

const getAll = () => {
  return http.get('roster')
}

const getRoster = () => {
  return http.get('roster/full')
}

const refreshRoster = () => {
  return http.get('roster/full/refresh')
}

const getTeam = () => {
  return http.get('roster/team')
}

const refreshTeam = () => {
  return http.get('roster/team/refresh')
}

const RosterService = {
  getAll,
  getRoster,
  refreshRoster,
  getTeam,
  refreshTeam
}

export default RosterService