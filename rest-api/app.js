/**
 * Main starting point of rest api
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

require('dotenv').config()

const http = require('http')
const express = require('express')
const socket = require('socket.io')
const logger = require('morgan')

// Set up server with http, express and socket.io
const app = express()
const server = http.createServer(app)
const io = socket.listen(server)

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
const { runInNewContext } = require('vm')
let token = null

const getToken = async () => {
  try {
    if (token === null || token.expired) {
      const client = new ClientCredentials(credentials)
      const tokenData = await client.getToken()
      token = tokenData.token
      // console.log(tokenData)
      console.log(token)
    }
    return token
  } catch (err) {
    console.log(err)
  }
}

// Set up logger
app.use(logger('dev'))

// Set up body usage
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(async (req, res, next) => {
  res.locals.token = await getToken()
  next()
})

// Set up routes
app.use('/', require('./routes/homeRouter'))
app.use('/roster', require('./routes/rosterRouter'))

// Set up socket middleware
app.use((event, req, res, next) => {
  io.emit('event', event)
})

// Connection to socket successful
io.on('connection', (socket) => {
  console.log('connected on socket!')
})

// Test server
server.listen(process.env.PORT, () => console.log('Testing server at http://localhost:' + process.env.PORT, 'NODE_ENV is set to: ' + process.env.NODE_ENV))
