import type { Transaction } from "../core/types.js";
import { Blockchain } from "../core/blockchain.js";
import { Mempool } from "../core/mempool.js";

export class Miner {
  constructor(
      private readonly blockchain: Blockchain,
          private readonly mempool: Mempool,
            ) {}

              mine(minerAddress: string) {
                  if (!minerAddress) {
                        throw new Error("Miner address is required");
                            }

                                const transactions = this.mempool.getAll();

                                    const block = this.blockchain.addBlock(
                                          transactions,
                                                minerAddress,
                                                    );

                                                        for (const transaction of transactions) {
                                                              this.mempool.remove(transaction.id);
                                                                  }

                                                                      return block;
                                                                        }

                                                                          getPendingTransactions(): Transaction[] {
                                                                              return this.mempool.getAll();
                                                                                }
                                                                                }