const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

it('POST /users', async () => {
    const response = await request(app)
        .post('/users')
        .set('Content-type', 'application/json')
        .send()
    expect(response.statusCode).toBe(201)
})
