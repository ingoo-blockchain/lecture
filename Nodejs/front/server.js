const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.render('index.html')
})

app.listen(3000, () => {
    console.log(`server start`)
})
