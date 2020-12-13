
/**
 * Roster controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'
const axios = require("axios");

const rosterController = {}

/**
 * Roster controller
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
rosterController.index = async (req, res, next) => {
  try {
    const test = await axios.get('eu.api.blizzard.com/data/wow/guild/tarrenmill/apeenclosure/roster')
    console.log('roster', test)
  } catch (err) {
    next(err)
  }
}

module.exports = rosterController
