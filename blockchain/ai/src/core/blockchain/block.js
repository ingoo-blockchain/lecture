const IBlock = require('./interfaces/block.interface')

class Block extends IBlock {
    #merkle
    #SHA256
    #hexToBinary

    static difficultyAdjustmentInterval
    static blockGenerationInterval
    static unit

    /**
     * Initializes a new instance of the Block class.
     *
     * @param {Object} params
     * @param {number} params.difficultyAdjustmentInterval
     * @param {number} params.blockGenerationInterval
     * @param {number} params.unit
     * @param {MerkleTree} params.merkle
     * @param {function} params.SHA256
     * @param {function} params.hexToBinary
     */
    constructor({
        difficultyAdjustmentInterval,
        blockGenerationInterval,
        unit,
        merkle,
        SHA256,
        hexToBinary,
    }) {
        super()

        this.#merkle = merkle
        this.#SHA256 = SHA256
        this.#hexToBinary = hexToBinary

        Block.difficultyAdjustmentInterval = difficultyAdjustmentInterval
        Block.blockGenerationInterval = blockGenerationInterval
        Block.unit = unit
    }

    /**
     * Creates a new block.
     *
     * @param {Object} params
     * @param {IBlock} params.previousBlock
     * @param {number} params.adjustmentDifficulty
     * @param {number} params.adjustmentTimestamp
     * @param {string[]} params.data
     * @returns {IBlock}
     */
    create({ previousBlock, adjustmentDifficulty, adjustmentTimestamp, data }) {
        try {
            const { height, hash: previousHash } = previousBlock
            this.height = height + 1
            this.previousHash = previousHash
            const merkleRoot = this.getMerkleRoot(data)

            if (merkleRoot.isError) throw new Error(merkleRoot.error)
            this.merkleRoot = merkleRoot.value

            this.nonce = 0
            this.timestamp = new Date().getTime()
            this.difficulty = this.getDifficulty({
                height: this.height,
                timestamp: this.timestamp,
                previousDifficulty: previousBlock.difficulty,
                adjustmentDifficulty,
                adjustmentTimestamp,
            })

            this.hash = this.createBlockHash(this)
            this.updateBlock({ previousBlock, adjustmentDifficulty, adjustmentTimestamp })

            const isValid = this.isValidNewBlock({ previousBlock, newBlock: this })
            if (isValid.isError) throw new Error(isValid.error)
            return this
        } catch (e) {
            throw new Error(e.message)
        }
    }

    /**
     * Updates the block.
     *
     * @param {Object} params
     * @param {IBlock} params.previousBlock
     * @param {number} params.adjustmentDifficulty
     * @param {number} params.adjustmentTimestamp
     */
    updateBlock({ previousBlock, adjustmentDifficulty, adjustmentTimestamp }) {
        let hashBinary = this.hashToBinary(this.hash)

        while (!hashBinary.startsWith('0'.repeat(this.difficulty))) {
            this.nonce += 1
            this.timestamp = new Date().getTime()
            this.difficulty = this.getDifficulty({
                height: this.height,
                timestamp: this.timestamp,
                previousDifficulty: previousBlock.difficulty,
                adjustmentDifficulty,
                adjustmentTimestamp,
            })
            this.hash = this.createBlockHash(this)
            hashBinary = hexToBinary(this.hash)
        }
    }

    /**
     * Converts the given hash to a binary string.
     *
     * @param {string} hash
     * @returns {string}
     */
    hashToBinary(hash) {
        return this.#hexToBinary(hash)
    }

    /**
     * Creates a block hash.
     *
     * @param {IBlock} block
     * @returns {string}
     */
    createBlockHash(block) {
        return this.#SHA256(
            Object.entries(block)
                .filter((v) => v[0] !== 'hash' && v[0] !== 'data')
                .join(''),
        ).toString()
    }

    /**
     * Calculates the Merkle root for the given block's data.
     *
     * @param {string[]} data
     * @returns {Object}
     */
    getMerkleRoot(data) {
        return Array.isArray(data)
            ? { isError: false, value: this.#merkle('sha256').sync(data).root() || '0'.repeat(64) }
            : { isError: true, error: 'The content of data is not an array.' }
    }

    /**
     * Calculates the difficulty for the given block.
     *
     * @param {Object} params
     * @param {number} params.height
     * @param {number} params.timestamp
     * @param {number} params.adjustmentDifficulty
     * @param {number} params.adjustmentTimestamp
     * @param {number} params.previousDifficulty
     * @returns {number}
     */
    getDifficulty({
        height,
        timestamp,
        adjustmentDifficulty,
        adjustmentTimestamp,
        previousDifficulty,
    }) {
        if (height < 10) return 0
        if (height >= 10 && height < 20) return 1
        if (height % Block.difficultyAdjustmentInterval !== 0) return previousDifficulty

        const timeTaken = timestamp - adjustmentTimestamp
        const timeExpected =
            Block.unit * Block.blockGenerationInterval * Block.difficultyAdjustmentInterval

        if (timeTaken < timeExpected / 2) return adjustmentDifficulty + 1
        if (timeTaken > timeExpected * 2) return adjustmentDifficulty - 1
        return adjustmentDifficulty
    }

    /**
     * Validates the given new block.
     *
     * @param {Object} params
     * @param {IBlock} params.previousBlock
     * @param {IBlock} params.newBlock
     * @returns {Object}
     */
    isValidNewBlock({ previousBlock, newBlock }) {
        try {
            if (!previousBlock) throw new Error('Previous block is not provided.')
            if (!newBlock) throw new Error('New block is not provided.')
            if (previousBlock.height + 1 !== newBlock.height)
                throw new Error('Invalid block height.')
            if (previousBlock.hash !== newBlock.previousHash)
                throw new Error('Invalid previous hash.')
            if (this.createBlockHash(newBlock) !== newBlock.hash)
                throw new Error('Invalid block hash.')
            return { isError: false, value: undefined }
        } catch (e) {
            return { isError: true, error: e.message }
        }
    }
}

module.exports = Block
