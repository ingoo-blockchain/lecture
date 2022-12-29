require('dotenv')
const app = require('./app')
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
