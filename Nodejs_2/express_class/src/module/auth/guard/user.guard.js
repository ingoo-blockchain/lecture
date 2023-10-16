import Guard from '../../../../Ingspress/common/http-lifecycle/guard.js'
import UnauthorizedException from '../../../common/exceptions/unauthorzed.exception.js'

class UserGuard extends Guard {
    canActivate(context) {
        throw new UnauthorizedException('사용자 정보가 옳바르지 않습니다.')
        return true
    }
}

export default UserGuard
