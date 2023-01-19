const JWT = require('./jwt')

describe('lib/JWT.js', () => {
    let jwt
    it('constructor', () => {
        expect(typeof JWT).toBe('function')
        jwt = new JWT({ crypto: require('crypto') })
        expect(typeof jwt.crypto).toBe('object')
    })

    it('encode', () => {
        expect(typeof jwt.encode).toBe('function')
        const value = { foo: 'bar' }
        // const expectResult = 'eyJmb28iOiJiYXIifQ=='
        const expectResult = 'eyJmb28iOiJiYXIifQ'
        const base64 = jwt.encode(value)
        expect(base64).toBe(expectResult)
    })

    it('createSignature', () => {
        expect(typeof jwt.createSignature).toBe('function')

        const tokenArr = ['foo', 'bar', 'baz']
        const salt = 'web7722'
        const expectedResult = '4vvRel4U7T2i8NR/2Cd7Cb4qdgw2R2NfR4wS2deUzRQ'

        const result = jwt.createSignature(tokenArr, salt)
        expect(result).toBe(expectedResult)
    })

    it('sign', () => {
        expect(typeof jwt.sign).toBe('function')

        const data = { userId: 1234 }
        const expectedResult =
            'eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMzR9.SOGk6KAlOqXzzAVE+fvD5HnFBb6xPmS+RgJsa9pcDfE'

        const result = jwt.sign(data)
        expect(result).toBe(expectedResult)
    })

    it('decode', () => {
        expect(typeof jwt.decode).toBe('function')

        const value = 'eyJ1c2VySWQiOjEyMzR9'
        const expectedResult = { userId: 1234 }

        const result = jwt.decode(value)
        expect(result).toStrictEqual(expectedResult)
    })

    it('verify', () => {
        expect(typeof jwt.verify).toBe('function')
        const token =
            'eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMzR9.SOGk6KAlOqXzzAVE+fvD5HnFBb6xPmS+RgJsa9pcDfE'
        const salt = 'web7722'
        const expectResult = { userId: 1234 }
        const result = jwt.verify(token, salt)
        expect(result).toStrictEqual(expectResult)

        const tokenErr =
            'eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMzR9.invalid_signature'
        const saltErr = 'web7722'
        expect(() => jwt.verify(tokenErr, saltErr)).toThrow('invalid token')
    })
})
