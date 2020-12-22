
/**
 * Mongoose schema/model for the characters.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const mongoose = require('mongoose')

const DungeonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  short_name: {
    type: String,
    required: true,
    unique: false
  },
  level: {
    type: Number,
    required: true,
    unique: false
  },
  upgrade: {
    type: Number,
    required: true,
    unique: false
  },
  score: {
    type: Number,
    required: true,
    unique: false
  }
})

const KeystoneSchema = new mongoose.Schema({
  score: {
    type: String,
    required: true,
    unique: false
  },
  recentRuns: [DungeonSchema],
  bestRuns: [DungeonSchema],
  highestRuns: [DungeonSchema],
  weeklyHighestRuns: [DungeonSchema],
  weeklyHighestRunLevel: {
    type: Number,
    required: true,
    unique: false
  }
})

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
    type: Number,
    required: true,
    unique: false
  },
  lastLogin: {
    type: Number,
    required: true,
    unique: false
  },
  keystoneInfo: KeystoneSchema,
  weeklyKey: {
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

CharacterProfileSchema.statics.getRoster = async function () {
  try {
    return await this.find()
  } catch (err) {
    console.log(err)
  }
}

CharacterProfileSchema.statics.getTeam = async function () {
  try {
    return await this.find({ rank: { $in: [0, 1, 3] } })
  } catch (err) {
    console.log(err)
  }
}

const CharacterProfile = mongoose.model('CharacterProfile', CharacterProfileSchema)

module.exports = CharacterProfile
