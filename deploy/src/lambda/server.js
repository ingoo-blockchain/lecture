const serverless = require('serverless-http')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/test', (req, res) => {
    res.send('test')
})

// express 에서 직접 실행 X
// app.listen(port, () => {
//     console.log(`server is running on port : ${port}`)
// })

module.exports.handler = serverless(app)
