const UserController = require('./user.controller')
const http = require('node-mocks-http')

describe('UserController', () => {
    let req, res, next, controller, service, result
    beforeEach(() => {
        req = http.createRequest()
        res = http.createResponse()
        next = jest.fn()

        req.headers.authorization = 'Bearer token'

        result = {
            userid: 'web7722',
            username: 'ingoo',
            userpw: '1234',
        }

        service = {
            signup: jest.fn().mockResolvedValue(result),
            me: jest.fn().mockResolvedValue(result),
        }

        controller = new UserController({ userService: service })
    })

    describe('getMe', () => {
        it('[try] 정상적인 요청', async () => {
            await controller.getMe(req, res, next)

            expect(service.me).toHaveBeenCalledWith('Bearer', 'token')
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(result)
        })

        it('[catch] 요청해더 Authorization 없이 요청', async () => {
            const req = http.createRequest()
            await controller.getMe(req, res, next)

            expect(service.me).not.toHaveBeenCalled()
            expect(next).toHaveBeenCalledWith(new Error('Authorization not found'))
        })

        it('[catch] service 에서 오류', async () => {
            service.me = jest.fn().mockRejectedValue(new Error('err'))
            await controller.getMe(req, res, next)

            expect(service.me).toHaveBeenCalledWith('Bearer', 'token')
            expect(next).toHaveBeenCalledWith(new Error('err'))
        })
    })

    describe('postSignup', () => {
        // req.body = { ...result }
        it('[try] 정상적인 요청', async () => {
            req.body = { ...result }
            await controller.postSignup(req, res, next)

            expect(service.signup).toHaveBeenCalledWith(req.body)
            expect(res.statusCode).toBe(201)
            expect(res._getJSONData()).toEqual(result)
        })

        it('[catch] service 에서 오류', async () => {
            req.body = { ...result }
            service.signup = jest.fn().mockRejectedValue(new Error('signup error'))

            await controller.postSignup(req, res, next)

            expect(service.signup).toHaveBeenCalledWith(req.body)
            expect(next).toHaveBeenCalledWith(new Error('signup error'))
        })
    })
})
