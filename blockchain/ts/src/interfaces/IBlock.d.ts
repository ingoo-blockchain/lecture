type BlockData = string | Record<string, unknown>
type Difficulty = number
type Timestamp = number
type Hash = string

interface BlockHeader {
    version: string
    height: number
    timestamp: Timestamp
    previoushHash: string
}

interface BlockInfo extends BlockHeader {
    merkleRoot: string
    nonce: number
    difficulty: Difficulty
    data: BlockData
}

interface IBlock extends BlockInfo {
    hash: Hash
}

interface Adjustment {
    difficulty: Difficulty
    timestamp: number
}

interface BlockDifficultyParams {
    height: number
    adjustment: Adjustment
    previousDifficulty: number
}

interface BlockProps {
    previousBlock: IBlock
    data: BlockData
}
