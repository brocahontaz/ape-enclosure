
/**
 * Mongoose schema/model for the characters.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const mongoose = require('mongoose')

const CharacterProfileSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  titleDisplay: {
    type: String,
    required: true,
    unique: false
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: true,
    unique: false
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  realm: {
    type: String,
    required: true,
    unique: false
  },
  level: {
    type: Number,
    required: true,
    unique: false
  },
  itemLevel: {
    type: Number,
    required: true,
    unique: false
  },
  className: {
    type: String,
    required: true,
    unique: false
  },
  classIcon: {
    type: String,
    required: true,
    unique: false
  },
  activeSpec: {
    type: String,
    required: true,
    unique: false
  },
  activeSpecIcon: {
    type: String,
    required: true,
    unique: false
  },
  race: {
    type: String,
    required: true,
    unique: false
  },
  rank: {
    type: Number,
    required: true,
    unique: false
  },
  covenant: {
    type: String,
    required: true,
    unique: false
  },
  soulbinds: {
    type: [],
    required: true,
    unique: false
  },
  activeSoulbind: {
    type: String,
    required: true,
    unique: true
  },
  renown: {
    type: String,
    required: true,
    unique: false
  },
  lastLogin: {
    type: Number,
    required: true,
    unique: false
  }
}, {
  timestamps: true
})

CharacterProfileSchema.statics.updateChar = async function (id, data) {
  try {
    return await this.update({ id: id }, data, { upsert: true, setDefaultsOnInsert: true })
  } catch (err) {
    console.log(err)
  }
}

const CharacterProfile = mongoose.model('CharacterProfile', CharacterProfileSchema)

module.exports = CharacterProfile
