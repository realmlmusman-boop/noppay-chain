import type { Transaction } from "../core/types.js";
import { Blockchain } from "../core/blockchain.js";
import { Mempool } from "../core/mempool.js";
import { validateTransaction } from "../core/transaction.js";
import {
  canSpend,
    getBalance as calculateBalance,
    } from "../core/balance.js";
    import { Miner } from "../consensus/miner.js";

    export class Node {
      readonly blockchain: Blockchain;
        readonly mempool: Mempool;
          readonly miner: Miner;

            constructor() {
                this.blockchain = new Blockchain();
                    this.mempool = new Mempool();
                        this.miner = new Miner(
                              this.blockchain,
                                    this.mempool,
                                        );
                                          }

                                            submitTransaction(
                                                transaction: Transaction,
                                                  ): boolean {
                                                      if (!validateTransaction(transaction)) {
                                                            return false;
                                                                }

                                                                    if (!canSpend(this.blockchain.blocks, transaction)) {
                                                                          return false;
                                                                              }

                                                                                  for (const block of this.blockchain.blocks) {
                                                                                        for (const existing of block.transactions) {
                                                                                                if (existing.id === transaction.id) {
                                                                                                          return false;
                                                                                                                  }
                                                                                                                        }
                                                                                                                            }

                                                                                                                                return this.mempool.add(transaction);
                                                                                                                                  }

                                                                                                                                    mine(minerAddress: string) {
                                                                                                                                        return this.miner.mine(minerAddress);
                                                                                                                                          }

                                                                                                                                            getPendingTransactions(): Transaction[] {
                                                                                                                                                return this.mempool.getAll();
                                                                                                                                                  }

                                                                                                                                                    getBlocks() {
                                                                                                                                                        return this.blockchain.blocks;
                                                                                                                                                          }

                                                                                                                                                            getBalance(address: string): bigint {
                                                                                                                                                                return calculateBalance(
                                                                                                                                                                      this.blockchain.blocks,
                                                                                                                                                                            address,
                                                                                                                                                                                );
                                                                                                                                                                                  }

                                                                                                                                                                                    isValid(): boolean {
                                                                                                                                                                                        return this.blockchain.isValid();
                                                                                                                                                                                          }
                                                                                                                                                                                          }