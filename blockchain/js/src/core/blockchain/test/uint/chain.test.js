const IBlock = require('../../interfaces/block.interface')
const Chain = require('../../chain')
const genesis = require('../../../../../genesis')
const { chainDI, block: Block } = require('../../config')

describe('Chain', () => {
    let block, chain

    let mockBlock = chainDI.block.create({
        previousBlock: genesis,
        adjustmentDifficulty: 0,
        adjustmentTimestamp: 0,
        data: ['#Block'],
    })
    // console.log(mockBlock)
    beforeEach(() => {
        block = {
            create: jest.fn(() => ({})),
            isValidNewBlock: jest.fn(({ previousBlock }) => ({
                isError: false,
                value: previousBlock,
            })),
        }
        chainDI.block = { ...block }
        chain = new Chain(chainDI)
    })

    describe('constructor', () => {
        it('should set the block property to the given block implementation', () => {
            expect(chain.block).toEqual(block)
        })

        it('should set the difficultyAdjustmentInterval property to the given interval', () => {
            expect(chain.difficultyAdjustmentInterval).toBe(10)
        })

        it('should add the given genesis block to the chain', () => {
            expect(chain).toEqual([chainDI.genesis])
        })
    })

    describe('latestBlock', () => {
        it('should return the last block in the chain', () => {
            chain.push({ blockNumber: 1 }, { blockNumber: 2 })
            expect(chain.latestBlock).toEqual({ blockNumber: 2 })
        })
    })

    describe('adjustmentBlock', () => {
        it('should return the block at the adjustment interval in the chain', () => {
            chain.push(...new Array(10).fill(null).map((v, k) => ({ blockNumber: k + 1 })))
            expect(chain.adjustmentBlock).toEqual({ blockNumber: 1 })
        })

        it('should return the first block in the chain if the interval is before the start of the chain', () => {
            chain.push(...new Array(3).fill(null).map((v, k) => ({ blockNumber: k + 1 })))
            expect(chain.adjustmentBlock).toEqual(chainDI.genesis)
        })
    })

    describe('addBlock', () => {
        it('should create a new block using the block implementation and add it to the chain', () => {
            chain.addBlock(['some data'])
            expect(block.create).toHaveBeenCalledWith({
                previousBlock: chainDI.genesis,
                adjustmentDifficulty: chainDI.genesis.difficulty,
                adjustmentTimestamp: chainDI.genesis.timestamp,
                data: ['some data'],
            })
            expect(chain).toHaveLength(2)
        })

        it('should return null if the block implementation returns an invalid block', () => {
            expect(chain.addBlock(['some data'])).toEqual({})
            expect(chain).toHaveLength(2)
        })
    })

    describe('addToChain', () => {
        let receivedBlock = new IBlock()
        receivedBlock.height = 1
        receivedBlock.previousHash = genesis.hash
        it('should add the given block to the chain if it is valid', () => {
            chain.addToChain({ data: ['some data'] })
            expect(chain).toHaveLength(2)
        })

        it('should return null if the given block is invalid', () => {
            block.isValidNewBlock.mockImplementation(() => ({
                isError: true,
                erorr: 'error',
            }))

            // expect(chain.addToChain({ data: ['some data'] })).toBeNull()
            expect(() => chain.addToChain({ data: ['some data'] })).toThrowError(/^error$/)
            expect(chain).toHaveLength(1)
        })

        it('should return null if the given block is not an instance of IBlock', () => {
            // expect(chain.addToChain({ data: ['some data'] })).toBeNull()
            expect(chain).toHaveLength(1)
        })
    })
})
