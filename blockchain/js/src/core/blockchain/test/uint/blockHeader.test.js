const blockHeader = require('../../../blockchain/blockHeader')
const genesis = require('../../../../../genesis')

describe('제네시스 블록', ()=>{
    it('제네시스블록이 객체인가?',()=>{
        expect(typeof genesis).toBe('object')
    })
    it('제네시스 블록 버전이 1.0.0 인가?', ()=>{
        expect(genesis.version).toBe('1.0.0')
    })
})
