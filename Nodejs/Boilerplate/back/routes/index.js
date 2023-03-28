const express = require('express')
const router = express.Router()
const users = require('../src/user/user.route')
const auths = require('../src/auth/auth.route')

router.use('/users', users)
router.use('/oauth', auths)

module.exports = router
