const {
    sequelize: {
        models: { User },
    },
} = require('../models')

const userRepository = require('./user.repository')
const userService = require('./user.service')
const userController = require('./user.controller')

const crypto = require('crypto')
const JWT = require('../lib/jwt')
const router = require('express').Router()

const jwt = new JWT({ crypto })

const repository = new userRepository({ User })
const service = new userService({ userRepository: repository, jwt })
const controller = new userController({ userService: service })

// controller 를 통해 method 가져오기
// get, post, put, fetch, delete 앞자리체크로 method 호출,

class RouterModule {
    constructor({ controller, router, Controller }) {
        this.createRouter(Controller)
        return router
    }

    createRouter(Controller) {
        for (const item of Object.getOwnPropertyNames(Controller.prototype)) {
            if (item === 'constructor') continue
            console.log(item)
        }
    }
}

const routers = new RouterModule({ controller, Controller: userController, router })
