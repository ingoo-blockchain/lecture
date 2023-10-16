import Logger from '../../../logger/index.js'
import { GuardError } from '../exceptions/guard.exception.js'

class Guard {
    canActivate(context) {
        if (!context) throw new GuardError('Invalid Context')
        Logger.error('Guard: canActivate method')
        return false
    }
}

export default Guard
