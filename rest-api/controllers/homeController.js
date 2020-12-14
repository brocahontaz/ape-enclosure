/**
 * Home controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

require('dotenv').config()
// const fetch = require('node-fetch')
// const axios = require('axios')

const homeController = {}

/**
 * Endpoint
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
homeController.index = async (req, res, next) => {
  try {
    res.json({ message: 'Welcome to the Ape Enclosure api! :)', token: res.locals.token.access_token })
  } catch (err) {
    next(err)
  }
}

module.exports = homeController
