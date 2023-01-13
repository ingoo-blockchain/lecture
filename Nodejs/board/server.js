const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

const list = []

app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/list', (req, res) => {
    res.render('board/list.html', { list })
})

app.get('/wirte', (req, res) => {
    res.render('board/write.html')
})

app.post('/write', (req, res) => {
    const { name, subject, content } = req.body
    list.push({ name, subject, content })
    res.redirect(`/view?index=${list.length - 1}`)
})

app.get('/view/:index', (req, res) => {
    const { index } = req.params
    const { content, subject, name } = list[index]
    res.render('board/view.html', {
        content,
        subject,
        name,
    })
})

app.get('/modify/:index', (req, res) => {
    const { index } = req.params
    const { subject, content, name } = list[index]
    res.render('board/modify.html', {
        subject,
        name,
        content,
    })
})

app.post('/modify', (req, res) => {
    const { index, ...rest } = req.body
    list[index] = rest
    res.redirect(`/view?index=${index}`)
})

class HTTPExecption extends Error {
    constructor(message, status) {
        super(message)
        this.statusCode = status
    }
}

app.post('/delete/:index', (req, res, next) => {
    // const { index } = req.params
    try {
        throw new HTTPExecption('님 무저건 에러남!', 500)
		// authorization 401 
    } catch (e) {
        next(e)
    }

    // list.splice(index, 1)
    // res.render(`/view?index=${index}`)
})

app.use((error, req, res, next) => {
    console.log(error)
    res.send({ message: error.message, status: error.statusCode })
})
//
// authorization vs authentication

app.listen(3000, () => {
    console.log(`server start`)
})
