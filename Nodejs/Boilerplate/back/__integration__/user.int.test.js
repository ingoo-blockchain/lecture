const app = require('../app')
const request = require('supertest')(app)
const { sequelize } = require('../models')

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

afterAll((done) => {
    sequelize.close()
    done()
})
describe('/api/users', () => {
    it('POST /', async () => {
        const response = await request
            .post('/api/users')
            .set('Content-type', 'application/json')
            .send({
                userid: 'web7722',
                userpw: '1234',
                username: 'ingoo',
            })

        expect(response.statusCode).toBe(201)
    })

    it('GET /', async () => {
        const token =
            'eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJpbmdvbyJ9.uMiI+vrtl0X/u2hg64YZGCOvvlogEYBOwradyX6duyU'
        const response = await request
            .get('/api/users')
            // .set('Authorization', `Bearer ${token}`)
            .auth(token, { type: 'bearer' })
            .send()

        expect(response.statusCode).toBe(200)
    })
})
