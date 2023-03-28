const UserService = require('./user.service')
const JWT = require('../../lib/jwt')
const crypto = require('crypto')

describe('UserService', () => {
    let userRepository, jwt, service, result

    beforeEach(() => {
        result = {
            userid: 'web7722',
            username: 'ingoo',
        }

        userRepository = {
            addUser: jest.fn().mockResolvedValue(result),
            getUserByToken: jest.fn().mockResolvedValue(result),
        }

        jwt = new JWT({ crypto })
        service = new UserService({ userRepository, jwt })
    })

    describe('signup', () => {
        it('[try] signup 메서드 확인하기', async () => {
            const user = await service.signup({
                userid: 'web7722',
                userpw: '1234',
                username: 'ingoo',
            })

            expect(userRepository.addUser).toHaveBeenCalledWith({
                userid: 'web7722',
                userpw: 'd412387ddb361d72b8aebb81b565dc2a1de003b1a7b8717b6768b1d06e2fd639',
                username: 'ingoo',
            })

            expect(user).toEqual(result)
        })

        it('[catch] 잘못된 인자값을 보낼시', async () => {
            const parameter = { userpw: '1234' }
            await expect(async () => await service.signup(parameter)).rejects.toThrowError(
                new Error('Please check the parameter value'),
            )
        })

        it('[catch] userRepository AddUser Method 오류시', async () => {
            userRepository.addUser = jest.fn().mockRejectedValue(new Error('err'))
            await expect(
                async () =>
                    await service.signup({
                        userid: 'web7722',
                        userpw: '1234',
                        username: 'ingoo',
                    }),
            ).rejects.toThrowError('err')
        })
    })

    describe('me', () => {
        const token =
            'eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMzR9.SOGk6KAlOqXzzAVE+fvD5HnFBb6xPmS+RgJsa9pcDfE'

        it('[try] me 메서드 호출', async () => {
            const user = await service.me('Bearer', token)

            expect(userRepository.getUserByToken).toHaveBeenCalledWith({ userId: 1234 })
            expect(user).toEqual(result)
        })

        it('[catch] Bearer 가 없는 경우', async () => {
            await expect(async () => await service.me('', '')).rejects.toThrowError(
                'Please check Authorization type.',
            )
        })

        it('[catch] 유효하지않는 토큰', async () => {
            await expect(async () => await service.me('Bearer', 'token....')).rejects.toThrowError(
                'invalid token',
            )
        })
    })
})
