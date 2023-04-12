import { GENESIS } from '@src/config/block.config'

describe('Block', () => {
    describe('Config', () => {
        it('Genesis Block 형태가 옳바른 형태인가?', () => {
            expect(GENESIS.version).toEqual('1.0.0')
            expect(GENESIS.merkleRoot).toEqual('0'.repeat(64))
            expect(GENESIS.hash).toEqual('0'.repeat(64))
            expect(GENESIS.nonce).toEqual(0)
            expect(GENESIS.difficulty).toEqual(0)
            expect(GENESIS.data).toEqual(['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'])
            expect(GENESIS.height).toEqual(0)
            expect(GENESIS.timestamp).toEqual(1231006506)
            expect(GENESIS.previoushHash).toEqual('0'.repeat(64))
        })
    })

    describe('hash', () => {
        it('hash 함수가 잘 만들어지는 가?', () => {
            expect(1 + 1).toBe(2)
        })
    })
})
