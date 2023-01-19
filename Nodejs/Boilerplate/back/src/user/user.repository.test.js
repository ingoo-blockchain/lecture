const UserRepository = require('./user.repository')

describe('UserRepository', () => {
    let User, repository
    const result = {
        userid: 'web7722',
        userpw: '1234',
        username: 'ingoo',
    }
    beforeEach(() => {
        User = {
            create: jest.fn().mockResolvedValue(result),
            findOne: jest.fn().mockResolvedValue(result),
        }

        repository = new UserRepository({ User })
    })

    describe('addUser', () => {
        const payload = {
            userid: 'web7722',
            userpw: '1234',
            username: 'ingoo',
        }

        it('[try] addUser 메서드 요청 확인', async () => {
            const user = await repository.addUser(payload)
            expect(User.create).toHaveBeenCalledWith(payload, { raw: true })
            expect(user).toEqual({ ...payload })
        })

        it('[catch] create method 가 reject가 발생되었을때', async () => {
            User.create = jest.fn().mockRejectedValue({})
            await expect(async () => await repository.addUser(payload)).rejects.toThrowError()
        })
    })

    describe('getUserByToken', () => {
        const tokenPayload = { userid: 'web7722' }
        it('[try] getUserByToken 메서드 요청 확인', async () => {
            const user = await repository.getUserByToken(tokenPayload)

            expect(User.findOne).toHaveBeenCalledWith({ raw: true, where: { userid: 'web7722' } })
            expect(user).toEqual(result)
        })

        it('[try] getUserByToken 메서드 호출시 findOen Reject 반환시.', async () => {
            User.findOne = jest.fn().mockRejectedValue({})
            await expect(
                async () => await repository.getUserByToken(tokenPayload),
            ).rejects.toThrowError()
        })
    })
})
