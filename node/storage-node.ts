import {
    BlockchainStorage,
    type StoredBlock,
} from "../storage/blockchain-storage.js";
import { Blockchain } from "../core/blockchain.js";
import type { Block } from "../core/block-builder.js";

export class StorageNode {
    readonly blockchain: Blockchain;
    readonly storage: BlockchainStorage;

    constructor(filePath: string) {
        this.blockchain = new Blockchain();
        this.storage = new BlockchainStorage(filePath);
    }

    async load(): Promise<void> {
        const storedBlocks = await this.storage.load();

        if (storedBlocks.length === 0) {
            return;
        }

        const blocks: Block[] = storedBlocks.map((stored): Block => ({
            index: stored.index,
            previousHash: stored.previousHash,
            timestamp: stored.timestamp,
            transactions: stored.transactions as Block["transactions"],
            miner: stored.miner,
            reward: BigInt(stored.reward),
            nonce: stored.nonce,
            hash: stored.hash,
        }));

        this.blockchain.replaceBlocks(blocks);
    }

    async save(): Promise<void> {
        const blocks: readonly StoredBlock[] = this.blockchain.blocks.map(
            (block: Block): StoredBlock => ({
                index: block.index,
                previousHash: block.previousHash,
                timestamp: block.timestamp,
                transactions: block.transactions,
                miner: block.miner,
                reward: block.reward.toString(),
                nonce: block.nonce,
                hash: block.hash,
            }),
        );

        await this.storage.save(blocks);
    }
}