const { router } = require("../Nodejs/board/app")

class Controller {
    constructor({ service }) {
        this.service = service
    }

    async getJoin(req, res, next) {
        const body = 10
        const response = await this.service.join(body)
        console.log(response)
        // res.status(500).send()
    }
}



class Service {
    constructor({ Repository }) {
        this.Repository = Repository
    }

    async join(body) {
        const result = await this.Repository.findByBody(body)
        return result
    }
}

class Repository {
    constructor({ User }) {
        this.User = User
    }

    async findByBody(body) {
        try {
            return this.User.body + body
        } catch (e) {}
    }
}

// 클로저
//
const Controller2 = ({ service }) => ({
    getJoin: async () => {
        const body = 10
        const response = await service.join(body)
    },
})

const User = {
    body: 'ingoo',
}

const a = new Controller({ service: new Service({ Repository: new Repository({ User }) }) })


router.get('/', a.getJoin)