const express = require('express')
const app = express()
const router = require('./routes')
const passport = require('./lib/passport')

app.use(express.json())
app.use(passport.initialize())
app.use(router)
app.use((error, req, res, next) => {
    res.status(500).send(error.message)
})

module.exports = app
