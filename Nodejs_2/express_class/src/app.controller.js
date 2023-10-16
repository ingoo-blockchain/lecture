import Controller from '../Ingspress/common/controller/index.js'
import { HttpException } from '../Ingspress/common/exceptions/http.exception.js'

export class AppController extends Controller {
    constructor({ AppService }) {
        super()
        this.AppService = AppService
        this.setRoute('get', '/', this.main)
        this.setRoute('get', '/sub', this.sub)
        this.setRoute('get', '/asdf', this.hello)
        this.setRoute('get', '/cookie', this.checkCookie)
    }

    main(context) {
        return 'hello world!'
    }

    test(context) {
        return 'hello~~~test'
    }

    sub(context) {
        return {
            sub: 'web7722',
        }
    }
    hello() {
        throw new HttpException('에러 체크~~~~~~~~')
        return '아쉬뱔~~'
    }

    checkCookie(context) {
        const {
            req: { cookies },
        } = context

        console.log(cookies)

        return 'cookie?'
    }
}
