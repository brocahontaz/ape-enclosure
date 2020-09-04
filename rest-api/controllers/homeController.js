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

const credentials = {
  client: {
    id: process.env.BLIZZ_CLIENT_ID,
    secret: process.env.BLIZZ_CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.BLIZZ_TOKEN_URL
  }
}

const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2')
let token = null

const homeController = {}

/**
 * Render the home page, with all issues.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
homeController.index = async (req, res, next) => {
  try {
    // const token = await getToken()

    console.log(token)

    res.json({ message: 'Welcome to the Ape Enclosure api! :)', token: token })
  } catch (err) {
    next(err)
  }
}

async function getToken () {
  try {
    const client = new ClientCredentials(credentials)
    const tokenData = await client.getToken()
    token = tokenData.token.access_token
    console.log('token', token.token.access_token)
    // return token
  } catch (err) {
    console.log(err)
  }
}

getToken()

module.exports = homeController
