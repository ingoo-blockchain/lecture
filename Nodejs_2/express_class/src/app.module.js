import Module from '../Ingspress/common/module.js'
import { AppService } from './app.service.js'
import { AppController } from './app.controller.js'

const appModule = new Module()
// appModule.imports([])
appModule.providers([AppService])
appModule.controllers([AppController])

export default appModule
