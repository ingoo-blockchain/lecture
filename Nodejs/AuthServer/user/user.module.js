const {
    sequelize: {
        models: { User },
    },
} = require('../models')
const userRepository = require('./user.repository')
const userService = require('./user.service')
const userController = require('./user.controller')



// const crypto = require('crypto')
// const JWT = require('../lib/jwt')
// const router = require('express').Router()
// const Modules = require('../lib/modules')

// const jwt = new JWT({ crypto })

// const repository = new userRepository({ User })
// const service = new userService({ userRepository: repository, jwt })
// const controller = new userController({ userService: service })

// module.exports = new Modules({
//     controller,
//     Controller: userController,
//     router,
// })
