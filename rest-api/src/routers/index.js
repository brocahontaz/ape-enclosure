const router = require('koa-router')
const _ = new router({
  prefix: '/api'
})

const home = require('./homeRouter')
const auth = require('./authRouter')
const character = require('./characterRouter')

_.use('/', home)
_.use('/auth', auth)
_.use('/character', character)

module.exports = _