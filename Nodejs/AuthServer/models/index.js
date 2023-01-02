require('dotenv')
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_NEV || 'development'
const config = require(path.join(__dirname, '..', 'config.js'))['db'][env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname)
    .filter((v) => v.indexOf('model') !== -1)
    .forEach((file) => {
        require(path.join(__dirname, file))(sequelize, Sequelize)
    })

module.exports = {
    sequelize,
    Sequelize,
}
