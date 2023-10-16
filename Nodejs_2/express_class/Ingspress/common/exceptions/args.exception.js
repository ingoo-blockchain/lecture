export class NoArgsError extends Error {
    constructor(message) {
        super(message || 'No arguments provided.')
        this.name = 'NoArgsError'
        this.code = 'NO_ARGS_PROVIDED'
    }
}
