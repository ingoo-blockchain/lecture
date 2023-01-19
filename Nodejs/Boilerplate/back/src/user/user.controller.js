class UserController {
    constructor({ userService }) {
        this.userService = userService
    }

    async postSignup(req, res, next) {
        try {
            const { userid, userpw, username } = req.body
            const user = await this.userService.signup({ userid, username, userpw })
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async getMe(req, res, next) {
        try {
            if (!req.headers.authorization) throw new Error('Authorization not found')
            const [bearer, token] = req.headers.authorization.split(' ')
            const user = await this.userService.me(bearer, token)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = UserController
