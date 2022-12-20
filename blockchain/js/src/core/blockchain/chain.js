const IBlock = require('./interfaces/block.interface')

class Chain extends Array {
    #block
    #difficultyAdjustmentInterval

    /**
     * Initializes a new instance of the Chain class.
     *
     * @param {Object} params
     * @param {IBlock} params.block
     * @param {IBlock} params.genesis
     * @param {number} params.difficultyAdjustmentInterval
     */
    constructor({ block, genesis, difficulty_adjustment_interval }) {
        super()
        this.#block = block
        this.#difficultyAdjustmentInterval = difficulty_adjustment_interval
        this.push(genesis)
    }

    get block() {
        return this.#block
    }

    get difficultyAdjustmentInterval() {
        return this.#difficultyAdjustmentInterval
    }

    get latestBlock() {
        return this[this.length - 1]
    }

    get adjustmentBlock() {
        const length = this.length
        const interval = length - this.#difficultyAdjustmentInterval
        return interval < 0 ? this[0] : this[interval]
    }

    /**
     * Adds a new block to the end of the chain.
     *
     * @param {string[]} data
     * @returns {IBlock}
     */
    addBlock(data) {
        try {
            const previousBlock = this.latestBlock
            const adjustmentBlock = this.adjustmentBlock
            const newBlock = this.#block.create({
                previousBlock,
                adjustmentDifficulty: adjustmentBlock.difficulty,
                adjustmentTimestamp: adjustmentBlock.timestamp,
                data,
            })

            this.addToChain(newBlock)
            return newBlock
        } catch (e) {
            console.error(e)
            return null
        }
    }

    /**
     * @param {IBlock} receviedBlock
     * @returns {Chain[] || null}
     */
    addToChain(receviedBlock) {
        try {
            const newBlock = this.#block.isValidNewBlock({
                newBlock: receviedBlock,
                previousBlock: this.latestBlock,
            })

            if (newBlock.isError) throw new Error(newBlock.error)
            this.push(newBlock.value)

            return this
        } catch (e) {
            console.error(e.meesage)
        }
    }

    /**
     * @param {IBlock[]} chain
     * @returns {{ isError: false; value: any } || { isError: true; error: string }}
     */
    isValidChain(chain) {
        //TODO: implement this method
        return true
    }

    replaceChain(chain) {
        //TODO: implement this method
        return true
    }
}

module.exports = Chain
