const {
    sequelize: {
        models: { User },
    },
} = require('../../models')

const AuthRepository = require('./auth.repository')
const AuthService = require('./auth.service')
const AuthController = require('./auth.controller')

const authRepository = new AuthRepository({ User })

module.exports = {
    authRepository,
}
