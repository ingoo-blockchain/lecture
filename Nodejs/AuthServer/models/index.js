require('dotenv')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_NEV || 'development'
const config = require(path.join(__dirname, '..', 'config.js'))['db'][env]

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

require('./user.model')(sequelize, Sequelize)

console.log(sequelize.models.User)
console.log(typeof sequelize.models.User)
const user = new sequelize.models.User({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
})

const user2 = sequelize.models.User.create({
    userid: 'web7722',
    username: 'ingoo',
    userpw: '1234',
}).then((result) => console.log(result))

console.log(user)
// console.log(user2)

module.exports = db
