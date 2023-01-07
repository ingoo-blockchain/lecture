class Modules {
    constructor({ controller, router, Controller }) {
        this.router = router
        this.controller = controller
        this.createRouter(Controller)

        return this.router
    }

    createRouter(Controller) {
        for (const item of Object.getOwnPropertyNames(Controller.prototype)) {
            if (item === 'constructor') continue
            const method = this.getMethod(item)
            const path = item.replace(method, '').toLowerCase()

            this.router[method](`/${path}`, (req, res, next) => {
                this.controller[item](req, res, next)
            })
        }
    }

    getMethod(methodName) {
        const pattern = ['get', 'post', 'update', 'delete']
        for (const method of pattern) {
            const exec = new RegExp(`^${method}`, 'g').exec(methodName)
            if (exec) return exec[0]
        }

        return pattern[0]
    }
}

module.exports = Modules