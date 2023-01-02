require('dotenv')
const app = require('./app')
const PORT = process.env.SERVER_PORT || 3000
const { sequelize } = require('./models')

app.listen(PORT, async () => {
    await sequelize.sync({ force: false })
    console.log(`Running on http://localhost:${PORT}`)
})
