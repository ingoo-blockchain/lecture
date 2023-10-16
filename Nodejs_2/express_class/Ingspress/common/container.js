import Util from '../util.js'
const util = new Util()

class Container {
    dependencies = {}
    factories = {}

    constructor() {}

    set(args) {
        args.forEach((arg) => {
            const className = util.getClassName(arg.toString())
            if (!className) throw new Error('class 설정이 옳바르지 않습니다.')
            this.factory(className, arg)
        })
    }

    get(variable) {
        if (!this.dependencies[variable]) {
            const factory = this.factories[variable]
            this.dependencies[variable] = factory && this.inject(factory)
            if (!this.dependencies[variable]) {
                throw new Error(`Cannot find module : ${variable}`)
            }
        }
        return this.dependencies[variable]
    }

    register(prop, dep) {
        this.dependencies[prop] = dep
    }
    factory(prop, dep) {
        this.factories[prop] = dep
    }

    inject(factory) {
        const source = factory.toString()
        const parameters = util.getClassParameters(source)
        if (!parameters) return new factory()

        const injectable = parameters.reduce((inject, parameter) => {
            const instnace = this.get(parameter)
            inject[parameter] = instnace
            return inject
        }, {})

        return new factory(injectable)
    }
}

export default Container
