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

// Set up logger
app.use(logger('dev'))

// Set up body usage
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Set up routes
app.use('/', require('./routes/homeRouter'))

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
