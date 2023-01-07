class App {
    app
    constructor(container) {
        const express = container.get('express')
        this.app = express()

        this.initialzeControllers(express.Router())
        return this.app
    }

    listen(port, callback) {
        this.app.listen(port, callback)
    }

    initialzeMiddlewares() {
        this.app.use(express.urlencoded({ extends: false }))
        this.app.use(express.json())
    }

    initialzeControllers(router) {
        // router.use()
    }
}

module.exports = App
