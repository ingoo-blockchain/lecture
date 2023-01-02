class JWT {
    constructor({ crypto }) {
        this.crypto = crypto
    }

    sign(data, options = {}) {
        const header = this.encode({ tpy: 'JWT', alg: 'HS256' })
        const payload = this.encode(data)
        const signature = this.createSignature([header, payload])
        return [header, payload, signature].join('.')
    }

    verify(token, salt) {
        const [header, payload, signature] = token.split('.')
        const isValidToken = signature !== this.createSignature([header, payload], salt)
        if (isValidToken) {
            throw new Error('invalid token')
        } else if (false) {
            // 옵션정보 만들고 토큰유효기간 설정
            throw new Error('expires  token')
        }

        return this.decode(payload)
    }

    encode(value) {
        return Buffer.from(JSON.stringify(value)).toString('base64').replace(/[=]/g, '')
    }

    decode(value) {
        return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'))
    }

    createSignature(tokenArr, salt = 'web7722') {
        const data = tokenArr.join('.')
        return this.crypto.createHmac('sha256', salt).update(data).digest('base64').replace(/[=]/g, '')
    }
}

module.exports = JWT
