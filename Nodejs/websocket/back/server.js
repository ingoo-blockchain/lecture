const { sequelize } = require('./models')
const app = require('./app')
const webSocket = require('./socket')

const server = app.listen(3000, async () => {
    await sequelize.sync({ force: true })
    console.log(`server start`)
})

webSocket(server)
