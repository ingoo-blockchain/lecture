const express = require('express')
const router = express.Router()
const { authController: controller } = require('./auth.module')
const passport = require('../../lib/passport')

router.post('/getToken', (req, res, next) => controller.getToken(req, res, next))
router.get('/kakao/login', passport.authenticate('kakao'), (req, res, next) => {
    res.send('?')
})
router.get('/kakao', passport.authenticate('kakao'), (req, res, next) => {
    res.json('hello?')
})

module.exports = router
