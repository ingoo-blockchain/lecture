const userController = require('../../user/user.controller')
const http = require('node-mocks-http')

describe('userController', () => {
    let req, res, next, controller, userServiceMock
    beforeEach(() => {
        req = http.createRequest()
        res = http.createResponse()
        next = jest.fn()

        userServiceMock = {
            signup: jest.fn(),
            me: jest.fn(),
        }
        controller = new userController({ userService: userServiceMock })
    })

    describe('me', () => {
        const mockValue = { userid: 'web7722', username: 'ingoo', userpw: '1234' }
        beforeEach(() => {})

        it('[try] 정상적인 요청', async () => {
            req.headers.authorization = 'Bearer token'
            userServiceMock.me.mockResolvedValue(mockValue)
            await controller.getMe(req, res, next)

            expect(userServiceMock.me).toHaveBeenCalledWith('Bearer', 'token')
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toStrictEqual(mockValue)
        })

        it('[catch] 요청해더 Authorization 없이 요청.', async () => {
            await controller.getMe(req, res, next)

            expect(userServiceMock.me).not.toHaveBeenCalled()
            expect(next).toHaveBeenCalledWith(new Error('Authorization not found'))
        })

        it('[catch] service 에서 오류', async () => {
            req.headers.authorization = 'Bearer token'
            const err = new Error('service me error')
            userServiceMock.me.mockRejectedValue(err)
            await controller.getMe(req, res, next)

            expect(userServiceMock.me).toHaveBeenCalledWith('Bearer', 'token')
            expect(next).toHaveBeenCalledWith(err)
        })
    })

    describe('Signup', () => {
        const mockValue = { userid: 'web7722', username: 'ingoo', userpw: '1234' }

        it('[try] 정상적인 요청', async () => {
            req.body = mockValue
            userServiceMock.signup.mockResolvedValue(mockValue)
            await controller.postSignup(req, res, next)

            expect(userServiceMock.signup).toHaveBeenCalledWith(mockValue)
            expect(res.statusCode).toBe(201)
            expect(res._getJSONData()).toStrictEqual(mockValue)
        })

        it('[catch] service 에서 오류', async () => {
            req.body = mockValue
            userServiceMock.signup.mockRejectedValue(new Error('signup error'))
            await controller.postSignup(req, res, next)

            expect(userServiceMock.signup).toHaveBeenCalledWith(mockValue)
            expect(next).toHaveBeenCalledWith(new Error('signup error'))
            // res.json 이 실행 안되었는지 확인하는 test 코드 찾기..
        })
    })
})
