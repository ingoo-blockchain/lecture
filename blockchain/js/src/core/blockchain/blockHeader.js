class BlockHeader {
    version
    height
    timestamp
    previousHash

    constructor(_previousBlock) {}

    get version(){
        return '1.0.0'
    }

    get timestamp() {
        return new Date().getTime()
    }

    get height() {
        return _previousBlock.height + 1
    }

    get previousHash() {
        return _previousBlock.hash
    }
}