
/**
 * Roster controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'
const axios = require('axios')
// const Character = require('../models/character')
const CharacterProfile = require('../models/characterprofile')

const rosterController = {}

const refreshRoster = async token => {
  try {
    console.log('tok', token)
    const test = await axios.get('https://eu.api.blizzard.com/data/wow/guild/tarren-mill/ape-enclosure/roster', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'profile-eu'
      }
    })
    console.log('roster', test)
    return test.data.members
  } catch (err) {
    console.log(err)
  }
}
/*
const refreshCharacter = async (token, characterId, classId, raceId) => {
  getClass(token, classId)
  console.log(await getRace(token, raceId))
}
*/

const getCharacter = async (token, characterName, realmSlug) => {
  try {
    const info = await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'profile-eu'
      }
    })
    // console.log(info.data)
    return info.data
  } catch (err) {
    console.log(err)
    return undefined
  }
}

const getCharacterMedia = async (token, characterName, realmSlug) => {
  try {
    const media = await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/character-media`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'profile-eu'
      }
    })
    return media.data.assets ? media.data.assets[0].value : media.data.avatar_url
  } catch (err) {
    console.log(err)
  }
}

const getCovenant = async (token, covenantId) => {
  try {
    const info = await axios.get(`https://eu.api.blizzard.com/data/wow/covenant/${covenantId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'static-eu'
      }
    })
    return info.data.name.en_US
  } catch (err) {
    console.log(err)
  }
}
/*
const getClass = async (token, classId) => {

  const cName = await getClassInfo(token, classId)
  const cIcon = await getClassMedia(token, classId)

  const pClass = {
    name: cName,
    icon: cIcon
  }

  return pClass
  // console.log(await getClassInfo(token, classId))
  // console.log(await getClassMedia(token, classId))
}
*//*
const getClassInfo = async (token, classId) => {
  try {
    const info = await axios.get('https://eu.api.blizzard.com/data/wow/playable-class/' + classId, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'static-eu'
      }
    })

    return info.data.name.en_US
  } catch (err) {
    console.log(err)
  }
}
*/
const getClassMedia = async (token, classId) => {
  try {
    const media = await axios.get('https://eu.api.blizzard.com/data/wow/media/playable-class/' + classId, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'static-eu'
      }
    })
    return media.data.assets[0].value
  } catch (err) {
    console.log(err)
  }
}

const getSpecMedia = async (token, specId) => {
  try {
    const media = await axios.get(`https://eu.api.blizzard.com/data/wow/media/playable-specialization/${specId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'static-eu'
      }
    })
    return media.data.assets[0].value
  } catch (err) {
    console.log(err)
  }
}

/*
const getRace = async (token, raceId) => {
  try {
    const race = await axios.get('https://eu.api.blizzard.com/data/wow/playable-race/' + raceId, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'static-eu'
      }
    })
    return race.data.name.en_US
  } catch (err) {
    console.log(err)
  }
}
*/
/**
 * Roster controller
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
rosterController.index = async (req, res, next) => {
  try {
    const roster = await CharacterProfile.find()
    res.json(roster)
  } catch (err) {
    console.log(err)
  }
}

rosterController.refresh = async (req, res, next) => {

  try {
    const token = res.locals.token.access_token

    const roster = await refreshRoster(token)

    for (const character of roster) {
      const charInfo = await getCharacter(token, character.character.name, character.character.realm.slug)

      if (charInfo) {
        const classIcon = await getClassMedia(token, character.character.playable_class.id)
        const charMedia = await getCharacterMedia(token, character.character.name, character.character.realm.slug)
        const specIcon = await getSpecMedia(token, charInfo.active_spec.id)
        const covenantInfo = charInfo.covenant_progress ? await getCovenant(token, charInfo.covenant_progress.chosen_covenant.id) : 'none'

        const profile = {
          key: character.character.key.href,
          title: charInfo.active_title ? charInfo.active_title.name.en_US : '',
          titleDisplay: charInfo.active_title ? charInfo.active_title.display_string.en_US : '',
          name: charInfo.name,
          icon: charMedia,
          id: charInfo.id,
          realm: charInfo.realm.name.en_US,
          level: charInfo.level,
          itemLevel: charInfo.equipped_item_level,
          className: charInfo.character_class.name.en_US,
          classIcon: classIcon,
          activeSpec: charInfo.active_spec.name.en_US,
          activeSpecIcon: specIcon,
          race: charInfo.race.name.en_US,
          rank: character.rank,
          covenant: covenantInfo,
          soulbinds: [],
          renown: charInfo.covenant_progress ? charInfo.covenant_progress.renown_level : 0,
          lastLogin: charInfo.last_login_timestamp
        }
        console.log(profile)
        CharacterProfile.updateChar(charInfo.id, profile)
      }
    }
  } catch (err) {
    console.log(err)
  }
  res.json('Roster refreshed!')
}

module.exports = rosterController
