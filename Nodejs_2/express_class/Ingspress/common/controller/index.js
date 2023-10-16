import Route from './route.js'

class Controller {
    routes = []
    constructor() {}

    setRoute(method, uri, handler) {
        this.routes.push(new Route(uri, method, handler))
    }

    getRoute() {
        return this.routes
    }
}

export default Controller
