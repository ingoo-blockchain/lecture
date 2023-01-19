class UserService {
    constructor({ userRepository, jwt }) {
        this.userRepository = userRepository
        this.jwt = jwt
        this.crypto = jwt.crypto
    }

    async signup({ userid, userpw, username }) {
        try {
            if (!userid || !userpw || !username) throw 'Please check the parameter value'
            const { createHmac } = this.crypto
            const hash = createHmac('sha256', 'web7722').update(userpw).digest('hex')
            const user = await this.userRepository.addUser({ userid, userpw: hash, username })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async me(bearer, token) {
        try {
            if (bearer.toLowerCase() !== 'bearer') throw 'Please check Authorization type.'
            const payload = this.jwt.verify(token, 'web7722')
            const user = await this.userRepository.getUserByToken({ ...payload })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = UserService
