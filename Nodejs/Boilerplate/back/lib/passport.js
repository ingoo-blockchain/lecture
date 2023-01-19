const passport = require('passport')
const kakaoStrategy = require('./kakaoStrategy')

passport.use(kakaoStrategy)

module.exports = passport
