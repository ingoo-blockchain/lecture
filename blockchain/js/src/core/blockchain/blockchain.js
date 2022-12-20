class BlockChain {
    // block = Block instance
    // latestBlocks = Chain instance 최근10개
    constructor({ Block, Chain, config, genesis }) {
        const chain = new Chain(genesis)
    }

    findBlock() {}
}

module.exports = BlockChain
