import http from 'http-common'

const getCharacter = name => {
  return http.get(`character/${name}`)
}

const CharacterService = {
  getCharacter
}

export default CharacterService