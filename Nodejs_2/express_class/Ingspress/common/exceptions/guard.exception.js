export class GuardError extends Error {
    constructor(message) {
        super(message || 'Invalid guard type. Expected an instance of Guard.')
        this.name = 'GuardError'
        this.code = 'INVALID_GUARD_TYPE'
    }
}
