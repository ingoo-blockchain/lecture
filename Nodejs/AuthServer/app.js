const App = require('./app.module')
const Container = require('./lib/container')

const container = new Container()
container.register('express', require('express'))
container.register('crypto', require('crypto'))
container.register('JWT', require('./lib/jwt'))

console.log(container)

const jwt = container.get('JWT')

const app = new App(container)
module.exports = app
