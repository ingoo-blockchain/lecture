class userRepository {
    constructor({ User }) {
        this.User = User
    }

    async addUser(payload) {
        try {
            const { dataValues } = await this.User.create(payload)
            return dataValues
        } catch (e) {
            throw new Error(e)
        }
    }

    async getUserByToken({ userid }) {
        try {
            const where = { userid }
            const data = await this.User.findOne({ where })
            if (!data?.dataValues) throw 'Can not User'

            return data.dataValues
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = userRepository
