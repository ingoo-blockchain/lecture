const IBlock = require('./interfaces/block.interface')
class Block extends IBlock {
    #merkle
    #SHA256
    #hexToBinary

    static difficulty_adjustment_interval
    static block_generation_interval
    static unit

    constructor({
        difficulty_adjustment_interval,
        block_generation_interval,
        unit,
        merkle,
        SHA256,
        hexToBinary,
    }) {
        super()

        this.#merkle = merkle
        this.#SHA256 = SHA256
        this.#hexToBinary = hexToBinary

        Block.DIFFICULTY_ADJUSTMENT_INTERVAL = difficulty_adjustment_interval
        Block.BLOCK_GENERATION_INTERVAL = block_generation_interval
        Block.UNIT = unit
    }

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
            this.data = data
            this.updateBlock({ previousBlock, adjustmentDifficulty, adjustmentTimestamp })

            const isValid = this.isValidNewBlock({ previousBlock, newBlock: this })
            if (isValid.isError) throw new Error(isValid.error)
            return this
        } catch (e) {
            throw new Error(e.message)
        }
    }

    updateBlock() {
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

    hashToBinary(hash) {
        return this.#hexToBinary(hash)
    }

    createBlockHash(block) {
        return this.#SHA256(
            Object.entries(block)
                .filter((v) => v[0] !== 'hash' && v[0] !== 'data')
                .join(''),
        ).toString()
    }

    getMerkleRoot(data) {
        return Array.isArray(data)
            ? { isError: false, value: this.#merkle('sha256').sync(data).root() || '0'.repeat(64) }
            : { isError: true, error: 'The content of data is not an array.' }
    }

    getDifficulty({
        height,
        timestamp,
        adjustmentDifficulty,
        adjustmentTimestamp,
        previousDifficulty,
    }) {
        if (height < 10) return 0
        if (height >= 10 && height < 20) return 1
        if (height % Block.DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return previousDifficulty

        const timeTaken = timestamp - adjustmentTimestamp
        const timeExpected =
            Block.UNIT * Block.BLOCK_GENERATION_INTERVAL * Block.DIFFICULTY_ADJUSTMENT_INTERVAL

        if (timeTaken < timeExpected / 2) return adjustmentDifficulty + 1
        if (timeTaken > timeExpected * 2) return adjustmentDifficulty - 1
        return adjustmentDifficulty
    }

    isValidNewBlock({ previousBlock, newBlock }) {
        if (previousBlock.height + 1 !== newBlock.height)
            return { isError: true, error: 'Block height is incorrect.' }
        if (previousBlock.hash !== newBlock.previousHash)
            return { isError: true, error: 'The previous hash value is not correct.' }
        if (this.createBlockHash(newBlock) !== newBlock.hash)
            return { isError: true, error: 'Block hash is incorrect.' }
        return { isError: false, value: newBlock }
    }
}

module.exports = Block
