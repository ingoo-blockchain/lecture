class Logger {
    static color_chip = {
        error: '\x1b[31m',
        info: '\x1b[32m',
        warn: '\x1b[33m',
        log: '\x1b[0m',
    }

    static print(message, type = 'log') {
        const start = `[${type}]`
        console.log(`${this.color_chip[type]}${start} ${message}${this.color_chip['log']}`)
    }

    static log(message) {
        this.print(message, 'log')
    }

    static error(message) {
        this.print(message, 'error')
    }

    static info(message) {
        this.print(message, 'info')
    }

    static warn(message) {
        this.print(message, 'warn')
    }
}

export default Logger
