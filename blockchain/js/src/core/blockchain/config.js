const Block = require('./block')
const Chain = require('./chain')
const IBlock = require('./interfaces/block.interface')

const difficulty_adjustment_interval = 10
const block_generation_interval = 10
const unit = 60
const constant = {
    difficulty_adjustment_interval,
    block_generation_interval,
    unit,
}
const blockDI = {
    ...constant,
    merkle: require('merkle'),
    SHA256: require('crypto-js').SHA256,
    hexToBinary: require('hex-to-binary'),
}

const chainDI = {
    ...constant,
    block: new Block(blockDI),
    genesis: new IBlock(require('../../../genesis')),
}

module.exports = {
    blockDI,
    chainDI,
}
