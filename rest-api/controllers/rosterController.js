
/**
 * Roster controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'
const axios = require('axios')
const Character = require('../models/character')

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

/**
 * Roster controller
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
rosterController.index = async (req, res, next) => {
  console.log('test')
  // res.json('test')
  try {
    const roster = await Character.find()
    // console.log(roster)
    res.json(roster)
  } catch (err) {
    console.log(err)
  }
}

rosterController.refresh = async (req, res, next) => {
  const roster = await refreshRoster(res.locals.token.access_token)
  roster.forEach(character => {
    console.log(character)
    const char = {
      key: character.character.key.href,
      name: character.character.name,
      id: character.character.id,
      realmKey: character.character.realm.key.href,
      realmId: character.character.realm.id,
      realmSlug: character.character.realm.slug,
      level: character.character.level,
      classKey: character.character.playable_class.key.href,
      classId: character.character.playable_class.id,
      raceKey: character.character.playable_race.key.href,
      raceId: character.character.playable_race.id,
      rank: character.rank
    }
    console.log('LALA', char)
    try {
      Character.updateChar(character.character.id, char)
    } catch (err) {
      console.log(err)
    }
  })
  res.json('Roster refreshed!')
}

module.exports = rosterController
