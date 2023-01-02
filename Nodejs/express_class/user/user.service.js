class userService {
    constructor(userRepository) {
        this.repository = userRepository
    }

    async login(email) {
        await this.repository.find(email)
        return "user"
    }
}

module.exports = userService
