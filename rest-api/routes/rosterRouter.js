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
router.get('/full', controller.full)
router.get('/full/refresh', controller.fullRefresh)
router.get('/team', controller.team)
router.get('/team/refresh', controller.teamRefresh)

module.exports = router
