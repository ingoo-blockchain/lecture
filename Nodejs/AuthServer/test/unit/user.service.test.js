const userService = require('../../user/user.service')
const JWT = require('../../lib/jwt')
const crypto = require('crypto')

describe('userService', () => {
    let userRepository, jwt, service
    const parameter = { userid: 'web7722', userpw: '1234', username: 'ingoo' }
    const { userpw, ...rest } = parameter
    const user = { ...rest, gender: '남자' }

    beforeEach(() => {
        userRepository = {
            addUser: jest.fn(),
            getUserByToken: jest.fn(),
        }

        jwt = new JWT({ crypto })
        service = new userService({ userRepository, jwt })
    })

    describe('signup', () => {
        it('[try] 정상적인 요청', async () => {
            userRepository.addUser.mockResolvedValue(user)
            const response = await service.signup(parameter)

            expect(userRepository.addUser).toHaveBeenCalledWith({
                ...parameter,
                userpw: 'd412387ddb361d72b8aebb81b565dc2a1de003b1a7b8717b6768b1d06e2fd639',
            })
            expect(response).toEqual(user)
        })

        it('[catch] userid 없이 실행', async () => {
            const parameter = { userpw: '1234', username: 'ingoo' }
            await expect(async () => await service.signup(parameter)).rejects.toThrowError(
                new Error('Please check the parameter value'),
            )
        })

        it('[catch] repository addUser 오류', async () => {
            userRepository.addUser.mockRejectedValue(new Error('repository error'))
            await expect(async () => await service.signup(parameter)).rejects.toThrowError('repository error')
        })
    })
    describe('me', () => {
        const token =
            'eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMzR9.SOGk6KAlOqXzzAVE+fvD5HnFBb6xPmS+RgJsa9pcDfE'
        it('[try] 정상적인 요청', async () => {
            userRepository.getUserByToken.mockResolvedValue(user)
            const response = await service.me('Bearer', token)

            expect(userRepository.getUserByToken).toHaveBeenCalledWith({ userId: 1234 })
            expect(response).toEqual(user)
        })

        it('[catch] Bearer 가 없는 경우', async () => {
            await expect(async () => service.me('', '')).rejects.toThrowError('Please check Authorization Type.')
        })

        it('[catch] 유효하지 않는 토큰', async () => {
            await expect(async () => service.me('Bearer', 'asdfasdf')).rejects.toThrowError('invalid token')
        })

        it('[catch] userRepository getUserByToken 오류', async () => {
            userRepository.getUserByToken.mockRejectedValue(new Error('repository error'))
            await expect(async () => service.me('Bearer', token)).rejects.toThrowError('repository error')
        })
    })
})
