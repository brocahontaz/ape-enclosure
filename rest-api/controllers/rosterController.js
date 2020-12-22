
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

const refreshTeam = async token => {
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

const getSoulbinds = async (token, characterName, realmSlug) => {
  try {
    const info = await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/soulbinds`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Battlenet-Namespace': 'profile-eu'
      }
    })
    return info.data.soulbinds
  } catch (err) {
    console.log(err)
  }
}

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

const getActiveSoulbind = soulbinds => {
  let active = ''
  soulbinds.forEach(soulbind => {
    if (soulbind.is_active) {
      active = soulbind.soulbind.name.en_US
    }
  })
  return active
}

const getKeystoneInfo = async (characterName, realmSlug) => {
  try {
    const keystoneData = await axios.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${realmSlug}&name=${characterName.toLowerCase()}&fields=mythic_plus_best_runs%2Cmythic_plus_ranks%2Cmythic_plus_recent_runs%2Cmythic_plus_highest_level_runs%2Cmythic_plus_weekly_highest_level_runs%2Cmythic_plus_scores_by_season%3Acurrent`)
    console.log(keystoneData.data)
    const keystoneInfo = {
      score: keystoneData.data.mythic_plus_scores_by_season[0].scores.all,
      recentRuns: getRunInfo(keystoneData.data.mythic_plus_recent_runs),
      bestRuns: getRunInfo(keystoneData.data.mythic_plus_best_runs),
      highestRuns: getRunInfo(keystoneData.data.mythic_plus_highest_level_runs),
      weeklyHighestRuns: getRunInfo(keystoneData.data.mythic_plus_weekly_highest_level_runs),
      weeklyHighestRunLevel: keystoneData.data.mythic_plus_weekly_highest_level_runs[0].mythic_level
    }
    return keystoneInfo
  } catch (err) {
    console.log(err)
    return undefined
  }
}

const getRunInfo = (runs) => {
  const result = []
  runs.forEach(dungeon => {
    const info = {
      name: dungeon.dungeon,
      short_name: dungeon.short_name,
      level: dungeon.mythic_level,
      upgrade: dungeon.num_keystone_upgrades,
      score: dungeon.score
    }
    result.push(info)
  })
  return result
}

/**
 * Roster controller
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
rosterController.index = async (req, res, next) => {
  const msg = {
    status: 'OK!',
    msg: 'Rest-API connection working!'
  }
  res.json(msg)
}

rosterController.full = async (req, res, next) => {
  try {
    const roster = await CharacterProfile.getRoster()
    res.json(roster)
  } catch (err) {
    console.log(err)
  }
}

rosterController.team = async (req, res, next) => {
  try {
    const roster = await CharacterProfile.getTeam()
    res.json(roster)
  } catch (err) {
    console.log(err)
  }
}

rosterController.fullRefresh = async (req, res, next) => {
  try {
    const token = res.locals.token.access_token

    const roster = await refreshRoster(token)

    for (const character of roster) {
      const charInfo = await getCharacter(token, character.character.name, character.character.realm.slug)

      if (charInfo) {
        const classIcon = await getClassMedia(token, character.character.playable_class.id)
        const charMedia = await getCharacterMedia(token, character.character.name, character.character.realm.slug)
        const specIcon = await getSpecMedia(token, charInfo.active_spec.id)
        const covenantInfo = charInfo.covenant_progress ? await getCovenant(token, charInfo.covenant_progress.chosen_covenant.id) : ''

        const soulbinds = charInfo.covenant_progress ? await getSoulbinds(token, character.character.name, character.character.realm.slug) : []
        console.log(soulbinds)

        const activeSoulbind = (charInfo.covenant_progress && soulbinds && soulbinds.length > 0) ? getActiveSoulbind(soulbinds) : ''

        const keystoneInfo = await getKeystoneInfo(character.character.name, character.character.realm.slug)

        console.log(keystoneInfo)

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
          soulbinds: soulbinds,
          activeSoulbind: activeSoulbind,
          renown: charInfo.covenant_progress ? charInfo.covenant_progress.renown_level : 0,
          lastLogin: charInfo.last_login_timestamp,
          keystoneInfo: keystoneInfo,
          weeklyKey: keystoneInfo ? keystoneInfo.weeklyHighestRunLevel : 0
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

rosterController.teamRefresh = async (req, res, next) => {
  try {
    const token = res.locals.token.access_token

    const roster = await refreshTeam(token)

    for (const character of roster) {
      const charInfo = await getCharacter(token, character.character.name, character.character.realm.slug)

      if (charInfo) {
        const classIcon = await getClassMedia(token, character.character.playable_class.id)
        const charMedia = await getCharacterMedia(token, character.character.name, character.character.realm.slug)
        const specIcon = await getSpecMedia(token, charInfo.active_spec.id)
        const covenantInfo = charInfo.covenant_progress ? await getCovenant(token, charInfo.covenant_progress.chosen_covenant.id) : 'none'

        const soulbinds = charInfo.covenant_progress ? await getSoulbinds(token, character.character.name, character.character.realm.slug) : []
        console.log(soulbinds)

        const activeSoulbind = (charInfo.covenant_progress && soulbinds && soulbinds.length > 0) ? getActiveSoulbind(soulbinds) : 'none'

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
          soulbinds: soulbinds,
          activeSoulbind: activeSoulbind,
          renown: charInfo.covenant_progress ? charInfo.covenant_progress.renown_level : 0,
          lastLogin: charInfo.last_login_timestamp
        }
        console.log(profile)
        CharacterProfile.updateChar(charInfo.id, profile)
      }
    }
    res.json('Roster refreshed!')
  } catch (err) {
    console.log(err)
    res.json(err)
  }
}

module.exports = rosterController
