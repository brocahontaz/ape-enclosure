import http from 'http-common'

const getAll = () => {
  return http.get('/roster/')
}

const RosterService = {
  getAll,
}

export default RosterService