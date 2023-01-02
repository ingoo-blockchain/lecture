class userController {
    constructor(userService) {
        this.userService = userService
    }

    async login(req, res, next) {
        const response = this.userService.login("web7722@gmail.com")
        res.send(response)
    }

    async getUser() {}
    async postUser() {}
}

module.exports = userController
