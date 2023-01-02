const userRepository = require('../../user/user.repository')

describe('userRepository', () => {
    let User, repository, dataValues
    beforeEach(() => {
        dataValues = {
            userid: 'web7722',
            username: 'ingoo',
            userpw: '1234',
        }
        User = {
            create: jest.fn().mockResolvedValue({ dataValues }),
            findOne: jest.fn().mockResolvedValue({ dataValues }),
        }

        repository = new userRepository({ User })
    })

    describe('addUser', () => {
        it('[try] 정상적인 요청', async () => {
            const payload = { ...dataValues }
            const user = await repository.addUser(payload)
            expect(User.create).toHaveBeenCalledWith(payload)
            expect(user).toEqual({ ...dataValues })
        })
    })

    describe('getUserByToken', () => {
        const tokenPayload = { userid: 'web7722' }
        it('[try] 정상적인 요청', async () => {
            const user = await repository.getUserByToken(tokenPayload)

            expect(User.findOne).toHaveBeenCalledWith({ where: { userid: 'web7722' } })
            expect(user).toEqual(dataValues)
        })

        it('[catch] 결과값이 null', async () => {
            User.findOne.mockResolvedValue(null)
            await expect(async () => await repository.getUserByToken(tokenPayload)).rejects.toThrowError('Can not User')
        })
    })
})
