
/**
 * Mongoose schema/model for the characters.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const mongoose = require('mongoose')

const CharacterSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  realmKey: {
    type: String,
    required: true,
    unique: false
  },
  realmId: {
    type: Number,
    required: true,
    unique: false
  },
  realmSlug: {
    type: String,
    required: true,
    unique: false
  },
  level: {
    type: Number,
    required: true,
    unique: false
  },
  classKey: {
    type: String,
    required: true,
    unique: false
  },
  classId: {
    type: Number,
    required: true,
    unique: false
  },
  raceKey: {
    type: String,
    required: true,
    unique: false
  },
  raceId: {
    type: Number,
    required: true,
    unique: false
  },
  rank: {
    type: Number,
    required: true,
    unique: false
  }
}, {
  timestamps: true
})

CharacterSchema.statics.updateChar = async function (id, data) {
  try {
    return await this.update({ id: id }, data, { upsert: true, setDefaultsOnInsert: true })
  } catch (err) {
    console.log(err)
  }
}

const Character = mongoose.model('Character', CharacterSchema)

module.exports = Character
