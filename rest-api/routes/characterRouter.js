/**
 * Character router
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/characterController')

router.get('/', controller.index)
router.get('/:name', controller.byName)

module.exports = router
