class Auth {
    constructor({ authService }) {
        this.authService = authService
    }

    async getToken(req, res, next) {
        try {
            const { userid, userpw } = req.body
            const token = await this.authService.token({ userid, userpw })
            res.status(200).json({ token })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = Auth
