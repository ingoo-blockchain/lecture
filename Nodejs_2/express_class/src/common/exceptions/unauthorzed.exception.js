import { HttpException } from '../../../Ingspress/common/exceptions/http.exception.js'

class UnauthorizedException extends HttpException {
    constructor(message) {
        super(message || 'UnauthorizedException', 'Unauthorzed', 401)
    }
}

export default UnauthorizedException
