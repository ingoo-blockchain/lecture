const express = require('express')
const multer = require('multer')
const cors = require('cors')
const nunjucks = require('nunjucks')
const path = require('path')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const destination = (req, file, done) => done(null, 'uploads/')
const filename = (req, file, done) => {
    // path extname
    const ext = path.extname(file.originalname)
    // path basename
    const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext
    done(null, filename) // 1 error , 내가 실제로 저장할 파일명
}

const storage = multer.diskStorage({
    destination, // destination : 목적지
    filename, // 파일이름
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

app.get('/single', (req, res, next) => {
    res.render('single.html')
})

app.get('/array', (req, res, next) => {
    res.render('array')
})

app.get('/uploads', (req, res, next) => {
    res.render('uploads')
})

app.post('/upload', upload.single('upload'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.send('upload')
})

app.post('/upload2', upload.array('upload'), (req, res) => {
    console.log(req.files)
    console.log(req.body)
    res.send('upload')
})

app.post(
    '/upload3',
    upload.fields([
        { name: 'upload1' },
        { name: 'upload2' },
        { name: 'upload3' },
        { name: 'upload4' },
    ]),
    (req, res) => {
        console.log(req.files.upload1)
        console.log(req.files.upload2)
        console.log(req.files.upload3)
        console.log(req.files.upload4)
        console.log(req.body)
        res.send('upload')
    },
)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log(`server start `)
})
