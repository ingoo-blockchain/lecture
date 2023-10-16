import express from 'express'
import { NoArgsError } from '../common/exceptions/args.exception.js'
import { GuardError } from '../common/exceptions/guard.exception.js'
import Guard from '../common/http-lifecycle/guard.js'
import Logger from '../../logger/index.js'
import { HttpException } from '../common/exceptions/http.exception.js'

export class IngsFactory {
    constructor(controllers) {
        this.app = express()
        this.globalPrefix = ''
        this.guards = []
        this.controllers = controllers

        return this
    }

    use(...args) {
        try {
            this.app.use(...args)
            Logger.info('register middleware')
        } catch (e) {
            Logger.error(e.stack)
        }
    }

    _registerRouter() {
        this._bindRoutes()
        this._notFound()
        this._errorHandler()
    }

    _bindRoutes() {
        try {
            this.controllers.forEach((controller) => {
                const { name: controller_name } = controller.constructor

                controller.routes.forEach((route) => {
                    const { uri, method, handler } = route
                    const message = `router regist method:${route.method}  uri:${route.uri} controller:${controller_name}`
                    Logger.info(message)
                    this._handler(route)
                })
            })
        } catch (e) {
            Logger.error(e.stack)
        }
    }

    _handler(route) {
        const { uri, method, handler } = route
        const callback = (req, res, next) => {
            try {
                const context = { req, res }
                const response = handler(context)
                res.json(response)
            } catch (e) {
                next(e)
            }
        }
        const path = '/' + (this.globalPrefix || '') + uri
        this.app[method](path, callback)
    }

    _notFound() {
        this.app.use((req, res, next) => {
            const error = new HttpException('NOT FOUND')
            error.statusCode = 404
            next(error)
        })
    }

    _errorHandler() {
        this.app.use((error, req, res, next) => {
            if (error instanceof HttpException) {
                const clientIPv4 = req.connection.remoteAddress
                const loggerMesage = `${error.timestamp} ${clientIPv4} ${req.method} ${req.path} ${error.message}`
                Logger.error(loggerMesage)
                res.status(500).json({ message: error.message, ...error })
            }
        })
    }

    guardHandler(guard) {
        const handler = (req, res, next) => {
            if (guard.canActivate({ req, res })) next()
        }
        this.app.use(handler)
    }

    enableCors() {}
    setGlobalPrefix(prefix) {
        this.globalPrefix = prefix
    }

    useGlobalGuards(guard) {
        if (guard instanceof Guard) {
            this.guards.push(guard)
        } else {
            throw new GuardError()
        }
    }

    useGlobalPipes(args) {}

    listen(port, callback) {
        this._registerRouter()
        this.app.listen(port, callback)
    }

    static async create(module) {
        const controllers = module.useController()
        return new this(controllers)
    }
}
