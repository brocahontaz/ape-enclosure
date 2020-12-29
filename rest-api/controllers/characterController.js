
/**
 * Character controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'
// const axios = require('axios')
// const Character = require('../models/character')
const CharacterProfile = require('../models/characterprofile')

const characterController = {}

characterController.index = (req, res, next) => {
  console.log('index')
  res.json('index')
}

characterController.byName = async (req, res, next) => {
  try {
    console.log(req.params.name)
    const character = await CharacterProfile.getByName(req.params.name)
    console.log(character)
    res.json(character)
  } catch (err) {
    console.log(err)
  }
}

module.exports = characterController
