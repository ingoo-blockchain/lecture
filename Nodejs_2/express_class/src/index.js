import AppModule from './app.module.js'
import { IngsFactory } from '../Ingspress/core/index.js'
import UserGuard from './module/auth/guard/user.guard.js'
import Container from '../Ingspress/common/container.js'
import cookieParser from 'cookie-parser'

const server = async () => {
    const app = await IngsFactory.create(AppModule)

    app.setGlobalPrefix('api')
    app.use(cookieParser())
    app.useGlobalGuards(new UserGuard())

    app.listen(3000, () => {
        console.log(`server listening on port 3000`)
    })
}

server()
