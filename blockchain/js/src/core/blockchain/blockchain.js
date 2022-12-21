const config = require('./config')

class BlockChain {
    #chain
    #block
    constructor({ Block, Chain, blockDI, chainDI }) {
        const block = new Block(blockDI)
        chainDI.block = block
        const chain = new Chain(chainDI)

        this.#chain = chain
        this.#block = block
    }

    getChain() {
        return this.#chain
    }
}

const blockchain = new BlockChain(config)
console.log(blockchain.getChain())
module.exports = blockchain
