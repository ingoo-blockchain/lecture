import Util from '../util.js'
import Controller from './controller/index.js'
import Container from './container.js'

const util = new Util()
class Module {
    constructor() {
        this.container = new Container()

        this.controllerModules = []
        this.importedModules = []
        this.providersModules = []
        this.controllerNames = []
    }

    imports(modules) {
        this.importedModules = modules
    }

    useController() {
        return this.controllerNames.map((controllerName) => {
            const controller = this.container.get(controllerName)
            return controller
        })
    }

    useImportedModules() {
        this.importedModules.forEach((module) => {
            const className = util.getClassName(module.toString())
            if (!className) throw new Error('Module Not Found.')

            this.providersModules[className] = new module()
        })
    }

    controllers(controllers) {
        console.log(controllers)
        if (!Array.isArray(controllers)) {
            throw new Error('Controllers must be provided as an array.')
        }

        const isExtendingController = controllers.every((controller) =>
            controller.toString().includes('extends Controller'),
        )

        if (!isExtendingController) {
            throw new Error('All elements in the array must be instances of the Controller class.')
        }

        this.controllerNames = controllers.map((v) => util.getClassName(v.toString()))
        this.container.set(controllers)

        // this.controllerModules = controllers
    }

    providers(providers) {
        if (!Array.isArray(providers)) {
            throw new Error('provider must be provided as an array.')
        }

        this.container.set(providers)
    }
    exports() {}

    static forRoot(options) {}
    static async forRootAsync(options) {}
}

export default Module
