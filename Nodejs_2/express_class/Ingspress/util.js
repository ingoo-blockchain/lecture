class Util {
    constructor() {}

    getClassName(source) {
        const match = source.match(/class\s+(\w+)\s+extends/)

        if (match && match[1]) {
            return match[1] // 출력: AppService
        } else {
            return null
        }
    }

    getClassParameters(source) {
        const constructorArgumentsRegex = /constructor\(\s*{\s*([a-zA-Z,\s]+)\s*}\s*\)/
        const matches = source.match(constructorArgumentsRegex)

        if (matches && matches[1]) {
            const argumentList = matches[1].replace(/\s/g, '').split(',')
            return argumentList
        } else {
            return null
        }
    }
}

export default Util
