const express = require('express')
const { createUser } = require('../controllers/bankuser.controllers')
const router = express.Router()

router.post('/createuser', createUser)

module.exports = router