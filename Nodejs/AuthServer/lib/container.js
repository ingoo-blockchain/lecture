class Container {
    dependencies = {}
    factories = {}

    constructor(...args) {
        if (args.length > 1) this.set(args)
    }

    set(args) {
        args.filter((arg) => typeof arg === 'function').forEach((v) => {
            const [line] = v.toString().split('\n')
            const [, variable] = line.split(' ')
            this.factories[variable] = v
        })

        args.filter((arg) => typeof arg !== 'function').forEach((obj) => {
            for (const key in obj) {
                this.dependencies[key] = obj[key]
            }
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

    inject(factory) {
        console.log(factory)
        const args = this.getParameters(factory).map((v) => this.get(v))
        return new factory(...args)
    }

    getParameters(factory) {
        const [constructor] = factory
            .toString()
            .split('\n')
            .filter((v) => v.indexOf('constructor') > 0)

        const start = constructor.indexOf('(')
        const end = constructor.indexOf(')')
        const parameters = constructor.substring(start + 1, end).replace(/\s/g, '')

        return !parameters.length ? [] : parameters.split(',')
    }
}

module.exports = Container
