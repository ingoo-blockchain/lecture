const Block = require('../../block')
const genesis = require('../../../../../genesis')
const { blockDI } = require('../../config')

describe('Genesis', () => {
    it('객체인가?', () => {
        expect(typeof genesis).toBe('object')
    })
    it('블록내용 확인', () => {
        expect(genesis.version).toBe('1.0.0')
        expect(genesis.height).toBe(0)
        expect(genesis.difficulty).toBe(0)
        expect(genesis.hash).toBe('0'.repeat(64))
        expect(genesis.previousHash).toBe(genesis.hash)
        expect(genesis.merkleRoot).toBe('0'.repeat(64))
        expect(genesis.data).toStrictEqual([])
    })
})

describe('Block', () => {
    const {
        difficulty_adjustment_interval,
        block_generation_interval,
        unit,
        merkle,
        SHA256,
        hexToBinary,
    } = blockDI
    const block = new Block({
        difficulty_adjustment_interval,
        block_generation_interval,
        unit,
        merkle,
        SHA256,
        hexToBinary,
    })
    const adjustmentDifficulty = 0
    const adjustmentTimestamp = new Date().getTime()

    let previousBlock

    beforeEach(() => {
        previousBlock = genesis
    })

    describe('merkleRoot', () => {
        const parameter = {}
        let merkleRoot = ''
        beforeEach(() => {
            parameter.data = ['tx#1', 'tx#2']
            merkleRoot = block.getMerkleRoot(parameter.data)
        })

        it('returns the correct Merkle root', () => {
            const data = ['a', 'b', 'c']
            const result = block.getMerkleRoot(data)

            expect(result).toEqual({
                isError: false,
                value: result.value,
            })
            expect(Buffer.from(result.value, 'hex').length).toBe(32)
        })

        it('throws an error if the data is not an array', () => {
            const data = 'a'
            const result = block.getMerkleRoot(data)

            expect(result).toEqual({
                isError: true,
                error: 'The content of data is not an array.',
            })
        })
    })

    describe('getDifficulty', () => {
        let parameter
        beforeEach(() => {
            parameter = {
                height: 10, // 앞으로 만들 블록높이
                timestamp: new Date().getTime(), // 앞으로 만든시간 (timestamp).
                adjustmentDifficulty, // height - 10 에 있는 블록의 난이도.
                adjustmentTimestamp, // 실제 bitcoin genesis 블록의 timestamp
                previousDifficulty: 0, // 이전 블록의 높이
            }

            difficulty = block.getDifficulty(parameter)
        })

        test('returns the correct difficulty', () => {
            const result = block.getDifficulty(parameter)
            expect(result).toEqual(1)
        })

        it('returns the correct difficulty for a block at height  1 to 9', () => {
            for (let i = 1; i < 10; i++) {
                parameter.height = i
                const difficulty = block.getDifficulty(parameter)
                expect(difficulty).toBe(0)
            }
        })

        it('returns the correct difficulty for a block at height  10 to 19', () => {
            for (let i = 10; i < 20; i++) {
                parameter.height = i
                const difficulty = block.getDifficulty(parameter)
                expect(difficulty).toBe(1)
            }
        })

        it('높이가 interval 배수가 아닐경우 이전 난이도 리턴', () => {
            for (let i = 31; i < 40; i++) {
                parameter.height = i
                parameter.previousDifficulty = 5
                const difficulty = block.getDifficulty(parameter)
                expect(difficulty).toBe(parameter.previousDifficulty)
            }
        })

        it('높이가 interval 배수일 경우 와 예상시간보다 늦게 만들어졌을경우 adjustmentDifficulty -1 리턴 ', () => {
            const diff = difficulty_adjustment_interval * block_generation_interval * unit * 3 // 10 * 10 * 60 * 3 = 18000
            parameter.height = 30
            parameter.previousDifficulty = 8
            parameter.adjustmentDifficulty = 8
            parameter.timestamp = new Date().getTime()
            parameter.adjustmentTimestamp = new Date().getTime() - diff
            const difficulty = block.getDifficulty(parameter)
            expect(difficulty).toBe(parameter.adjustmentDifficulty - 1)
        })

        it('높이가 interval 배수일 경우 와 예상시간보다 빨리 만들어졌을경우 adjustmentDifficulty -1 리턴 ', () => {
            const diff = (difficulty_adjustment_interval * block_generation_interval * unit) / 3 // 10 * 10 * 60 / 3 = 2000
            parameter.height = 30
            parameter.previousDifficulty = 8
            parameter.adjustmentDifficulty = 8
            parameter.timestamp = new Date().getTime()
            parameter.adjustmentTimestamp = new Date().getTime() - diff
            const difficulty = block.getDifficulty(parameter)
            expect(difficulty).toBe(parameter.adjustmentDifficulty + 1)
        })
    })

    describe('createBlockHash', () => {
        let hash
        let mockBlock
        beforeEach(() => {
            mockBlock = {
                version: '1.0.0',
                height: 1,
                timestamp: 1231006506 + 3600,
                previousHash: '0'.repeat(64),
                hash: undefined,
                merkleRoot: '0'.repeat(64),
                nonce: 0,
                difficulty: 0,
                data: [],
            }
            hash = block.createBlockHash(mockBlock)
        })

        it('hash 의 데이터타입이 string 확인', () => {
            expect(typeof hash).toBe('string')
        })

        it('hash 가 32byte인지 확인', () => {
            const byte = Buffer.from(hash, 'hex')
            expect(byte.length).toBe(32)
        })
    })

    describe('create', () => {
        let previousBlock
        let adjustmentDifficulty
        let adjustmentTimestamp
        let data

        beforeEach(() => {
            // Set up the previousBlock, adjustmentDifficulty, adjustmentTimestamp, and data for each test
            previousBlock = genesis
            adjustmentDifficulty = 0
            adjustmentTimestamp = new Date().getTime()
            data = ['1234567890', 'abcdefghij']
        })

        it('should create a new block with the correct properties', () => {
            // Create a new block
            const result = block.create({
                previousBlock,
                adjustmentDifficulty,
                adjustmentTimestamp,
                data,
            })

            // Check that the new block has the correct height, previousHash, merkleRoot, and difficulty
            expect(result.height).toBe(previousBlock.height + 1)
            expect(result.previousHash).toBe(previousBlock.hash)
            expect(result.merkleRoot).toBe(block.getMerkleRoot(data).value)
            expect(result.difficulty).toBe(0)

            // Check that the new block has a valid hash
            const hashBinary = block.hashToBinary(result.hash)
            expect(hashBinary.startsWith('0'.repeat(result.difficulty))).toBe(true)
        })

        it('should return an error if the data is not an array', () => {
            // Set the data to be a non-array value
            data = '1234567890'
            expect(() =>
                block.create({ previousBlock, adjustmentDifficulty, adjustmentTimestamp, data }),
            ).toThrowError('The content of data is not an array.')
        })
    })
})
