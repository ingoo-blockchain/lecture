const userController = require("./user.controller")
const userService = require("./user.service")
const userRepository = require("./user.repository")

const repository = new userRepository()
const service = new userService()
const controller = new userController(service)

module.exports = {
    controller,
    service,
    repository,
}
