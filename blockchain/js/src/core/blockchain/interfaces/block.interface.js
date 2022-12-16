class IBlock {
    version = '1.0.0'
    height
    timestamp
    previousHash
    hash
    merkleRoot
    nonce
    difficulty
    data

    constructor(block = null) {
        if (block === null) return this
        this.version = block.version
        this.height = block.height
        this.timestamp = block.timestamp
        this.previousHash = block.previousHash
        this.hash = block.hash
        this.merkleRoot = block.merkleRoot
        this.nonce = block.nonce
        this.difficulty = block.difficulty
        this.data = block.data
    }
}

module.exports = IBlock
