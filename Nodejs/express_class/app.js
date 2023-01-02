class App {
    app
    express
    port
    constructor({ port, express, module }) {
        this.express = express
        this.port = port
        this.app = express()
        this.initialzeControllers(module)
    }

    initialzeControllers(module) {
        console.log(module.user.controller)
    }
}

const user = require("./user/user.module")
console.log(user)
const config = {
    user: {
        controller: [
            { method: "GET", path: "/login", router: "login" },
            { method: "GET", path: "/signup", router: "signup" },
            { method: "POST", path: "/signup", router: "signup" },
            { method: "GET", path: "/welcome", router: "getWelcome" },
        ],
        service: "",
        module: "",
    },
    board: {
        controller: "",
        service: "",
        module: "",
    },
}

const app = new App({ port: 3000, express: require("express"), module: config })
