const IBlock = require("./interfaces/block.interface");

class Chain extends Array {
	#block;
	#difficultyAdjustmentInterval;

	/**
	 * Initializes a new instance of the Chain class.
	 *
	 * @param {Object} params
	 * @param {IBlock} params.block
	 * @param {IBlock} params.genesis
	 * @param {number} params.difficultyAdjustmentInterval
	 */
	constructor({ block, genesis, difficulty_adjustment_interval }) {
		super();
		this.#block = block;
		this.#difficultyAdjustmentInterval = difficulty_adjustment_interval;
		this.push(genesis);
	}

	get block() {
		return this.#block;
	}

	get difficultyAdjustmentInterval() {
		return this.#difficultyAdjustmentInterval;
	}

	get latestBlock() {
		return this[this.length - 1];
	}

	get adjustmentBlock() {
		const length = this.length;
		const interval = length - this.#difficultyAdjustmentInterval;
		return interval < 0 ? this[0] : this[interval];
	}

	/**
	 * Adds a new block to the end of the chain.
	 *
	 * @param {string[]} data
	 * @returns {IBlock}
	 */

	/// 블록 생성 후 체인에 추가하는 함수
	addBlock(data) {
		try {
			const previousBlock = this.latestBlock;
			const adjustmentBlock = this.adjustmentBlock;
			const newBlock = this.#block.create({
				previousBlock,
				adjustmentDifficulty: adjustmentBlock.difficulty,
				adjustmentTimestamp: adjustmentBlock.timestamp,
				data,
			});

			this.addToChain(newBlock);
			return newBlock;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/// 유효성을 검증한 새로운 블럭을 체인 배열에 push하여 체인에 추가하는 함수
	/**
	 * @param {IBlock} receviedBlock
	 * @returns {Chain[] || null}
	 */
	addToChain(receviedBlock) {
		try {
			const newBlock = this.#block.isValidNewBlock({
				newBlock: receviedBlock,
				previousBlock: this.latestBlock,
			});

			if (newBlock.isError) throw new Error(newBlock.error);
			this.push(newBlock.value);

			return this;
		} catch (e) {
			console.error(e.meesage);
		}
	}

	/// 체인의 유효성을 검증하는 함수
	/**
	 * @param {IBlock[]} chain
	 * @returns {{ isError: false; value: any } || { isError: true; error: string }}
	 */
	isValidChain(chain) {
		//TODO: implement this method
		return true;
	}

	/// 유효하지 않은 체인을 유효한 체인으로 대체하는 함수
	replaceChain(chain) {
		//TODO: implement this method
		return true;
	}
}

module.exports = Chain;
