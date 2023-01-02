const authController = require('../../auth/auth.controller')
const http = require('node-mocks-http')

describe('authController', () => {
    let req, res, next, controller, authServiceMock
    beforeEach(() => {
        req = http.createRequest()
        res = http.createResponse()
        next = jest.fn()

        authServiceMock = {
            token: jest.fn(),
        }
        controller = new authController({ authService: authServiceMock })
    })

    describe('getToken', () => {
        beforeEach(() => {
            req.body = { userid: 'web7722', userpw: '1234' }
        })
        it('[try] 정상적인 요청', async () => {
            authServiceMock.token.mockResolvedValue('token')
            await controller.getToken(req, res, next)

            expect(authServiceMock.token).toHaveBeenCalledWith(req.body)
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toStrictEqual({ token: 'token' })
        })

        it('[catch] service token 오류', async () => {
            const err = new Error('service token error')
            authServiceMock.token.mockRejectedValue(err)
            await controller.getToken(req, res, next)

            expect(authServiceMock.token).toHaveBeenCalledWith(req.body)
            expect(next).toHaveBeenCalledWith(err)
        })
    })
})
