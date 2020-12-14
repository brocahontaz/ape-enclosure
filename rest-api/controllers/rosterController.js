
/**
 * Roster controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'
const axios = require('axios')

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
    const roster = await refreshRoster(res.locals.token.access_token)
    // console.log(roster)
    res.json(roster)
  } catch (err) {
    console.log(err)
  }
}

module.exports = rosterController
