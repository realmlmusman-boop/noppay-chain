import { BlockchainStorage } from "../storage/blockchain-storage.js";
import { Blockchain } from "../core/blockchain.js";
import type { Block } from "../core/block-builder.js";
import type { Transaction } from "../core/types.js";

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

                                        const blocks: Block[] = storedBlocks.map((block) => ({
                                              index: block.index,
                                                    previousHash: block.previousHash,
                                                          timestamp: block.timestamp,
                                                                transactions: block.transactions as Transaction[],
                                                                      miner: block.miner,
                                                                            reward: BigInt(block.reward),
                                                                                  nonce: block.nonce,
                                                                                        hash: block.hash,
                                                                                            }));

                                                                                                this.blockchain.replaceBlocks(blocks);
                                                                                                  }

                                                                                                    async save(): Promise<void> {
                                                                                                        const blocks = this.blockchain.blocks.map((block) => ({
                                                                                                              index: block.index,
                                                                                                                    previousHash: block.previousHash,
                                                                                                                          timestamp: block.timestamp,
                                                                                                                                transactions: block.transactions,
                                                                                                                                      miner: block.miner,
                                                                                                                                            reward: block.reward.toString(),
                                                                                                                                                  nonce: block.nonce,
                                                                                                                                                        hash: block.hash,
                                                                                                                                                            }));

                                                                                                                                                                await this.storage.save(blocks);
                                                                                                                                                                  }
                                                                                                                                                                  }