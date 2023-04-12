import { SHA256 } from 'crypto-js'
import merkle from 'merkle'

class Block {
    getTimestamp(): Timestamp {
        return new Date().getTime()
    }

    createHash<T>(data: T): Hash {
        const dataString =
            typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean' ? data.toString() : JSON.stringify(data)
        const hash = SHA256(dataString).toString()
        return hash
    }

    isValidHash(hash: Hash): boolean {
        const hexRegExp = /^[0-9a-fA-F]+$/
        return hexRegExp.test(hash) && hash.length === 64 && '0'.repeat(64) !== hash
    }

    getMerkleRoot(data: BlockData): Hash {
        const dataHashes: Hash[] = data instanceof Array ? data.map((record) => this.createHash(record)) : [this.createHash(data)]
        const merkleRoot = merkle('sha256').sync(dataHashes).root()
        return merkleRoot
    }

    createBlockHash(blockinfo: BlockInfo): Hash {
        const sortedBlockInfoValues = Object.values(blockinfo).sort().join()
        const hash = this.createHash(sortedBlockInfoValues)
        return hash
    }
}

export default Block
