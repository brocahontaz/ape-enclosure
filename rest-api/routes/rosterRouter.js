/**
 * Roster router
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/rosterController')

router.get('/', controller.index)
router.get('/refresh', controller.refresh)

module.exports = router
