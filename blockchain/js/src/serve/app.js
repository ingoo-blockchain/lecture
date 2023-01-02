const express = require('express')
const app = express()
const PORT = process.env.SERVER_PORT || 3000

app.use(express.json())
app.get('/', (req, res) => {
    res.send('ingchain')
})

//chain
//block
//network

app.listen(PORT, () => {
    console.log(` server listening on port : ${PORT}`)
})
