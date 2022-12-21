const IBlock = require("./interfaces/block.interface");
class Block extends IBlock {
	#merkle;
	#SHA256;
	#hexToBinary;

	static difficulty_adjustment_interval;
	static block_generation_interval;
	static unit;

	constructor({
		difficulty_adjustment_interval,
		block_generation_interval,
		unit,
		merkle,
		SHA256,
		hexToBinary,
	}) {
		super();

		this.#merkle = merkle;
		this.#SHA256 = SHA256;
		this.#hexToBinary = hexToBinary;

		Block.DIFFICULTY_ADJUSTMENT_INTERVAL = difficulty_adjustment_interval;
		Block.BLOCK_GENERATION_INTERVAL = block_generation_interval;
		Block.UNIT = unit;
	}

	/// 이전 블록과 조정난이도, 조정타임스탬프를 가지고 현재 블록을 생성한 후 nonce값을 조정해가며 블록 업데이트
	/// nonce값이 조정된 새로운 블록의 유효성을 검증한 후 유효한 경우 생성된 블록 반환
	create({ previousBlock, adjustmentDifficulty, adjustmentTimestamp, data }) {
		try {
			const { height, hash: previousHash } = previousBlock;
			this.height = height + 1;
			this.previousHash = previousHash;
			const merkleRoot = this.getMerkleRoot(data);

			if (merkleRoot.isError) throw new Error(merkleRoot.error);
			this.merkleRoot = merkleRoot.value;

			this.nonce = 0;
			this.timestamp = new Date().getTime();
			this.difficulty = this.getDifficulty({
				height: this.height,
				timestamp: this.timestamp,
				previousDifficulty: previousBlock.difficulty,
				adjustmentDifficulty,
				adjustmentTimestamp,
			});

			this.hash = this.createBlockHash(this);
			this.data = data;
			this.updateBlock({
				previousBlock,
				adjustmentDifficulty,
				adjustmentTimestamp,
			});

			const isValid = this.isValidNewBlock({
				previousBlock,
				newBlock: this,
			});
			if (isValid.isError) throw new Error(isValid.error);
			return this;
		} catch (e) {
			throw new Error(e.message);
		}
	}

	/// 2진수로 변환된 해시값이 0으로 시작하지 않을 경우 nonce 값을 1씩 추가하는 함수
	updateBlock() {
		let hashBinary = this.hashToBinary(this.hash);

		while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
			this.nonce += 1;
			this.timestamp = new Date().getTime();
			this.difficulty = this.getDifficulty({
				height: this.height,
				timestamp: this.timestamp,
				previousDifficulty: previousBlock.difficulty,
				adjustmentDifficulty,
				adjustmentTimestamp,
			});
			this.hash = this.createBlockHash(this);
			hashBinary = hexToBinary(this.hash);
		}
	}

	/// 16진수의 해시를 에서 2진수로 변환하여 반환하는 함수
	hashToBinary(hash) {
		return this.#hexToBinary(hash);
	}

	/// 블록 해시를 반환하는 함수
	createBlockHash(block) {
		return this.#SHA256(
			Object.entries(block)
				.filter((v) => v[0] !== "hash" && v[0] !== "data")
				.join("")
		).toString();
	}

	/// 블록의 바디 부분인 data를 가지고 32바이트의 해시를 반환하는 함수
	getMerkleRoot(data) {
		return Array.isArray(data)
			? {
					isError: false,
					value:
						this.#merkle("sha256").sync(data).root() ||
						"0".repeat(64),
			  }
			: { isError: true, error: "The content of data is not an array." };
	}

	/// 함수의 반환 값 시나리오
	/// 1. 블록의 높이가 10보다 작은 경우 난이도 0.
	/// 2. 블록의 높이가 10~19사이 인 경우 난이도 1을 반환
	/// 3. 블록의 높이에서 난이도를 조정하기 위한 단위값을 나눈 나머지가 0이 아닌 경우 이전의 난이도를 반환
	/// 4. 1~3에 해당하지 않는 경우에는 소요된 시간과 예상된 시간을 비교하여 조정된 난이도를 반환
	getDifficulty({
		height,
		timestamp,
		adjustmentDifficulty,
		adjustmentTimestamp,
		previousDifficulty,
	}) {
		if (height < 10) return 0;
		if (height >= 10 && height < 20) return 1;
		if (height % Block.DIFFICULTY_ADJUSTMENT_INTERVAL !== 0)
			return previousDifficulty;

		const timeTaken = timestamp - adjustmentTimestamp;
		const timeExpected =
			Block.UNIT *
			Block.BLOCK_GENERATION_INTERVAL *
			Block.DIFFICULTY_ADJUSTMENT_INTERVAL;

		if (timeTaken < timeExpected / 2) return adjustmentDifficulty + 1;
		if (timeTaken > timeExpected * 2) return adjustmentDifficulty - 1;
		return adjustmentDifficulty;
	}

	/// 블록의 높이, 이전 블록의 해시, 새로운 블록의 해쉬를 비교하여 유효한 블록인 지를 검증하는 함수
	isValidNewBlock({ previousBlock, newBlock }) {
		if (previousBlock.height + 1 !== newBlock.height)
			return { isError: true, error: "Block height is incorrect." };
		if (previousBlock.hash !== newBlock.previousHash)
			return {
				isError: true,
				error: "The previous hash value is not correct.",
			};
		if (this.createBlockHash(newBlock) !== newBlock.hash)
			return { isError: true, error: "Block hash is incorrect." };
		return { isError: false, value: newBlock };
	}
}

module.exports = Block;
