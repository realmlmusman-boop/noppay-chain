import type { Block } from "./block-builder.js";
import type { Transaction } from "./types.js";

export function getBalance(
  blocks: readonly Block[],
    address: string,
    ): bigint {
      let balance = 0n;

        for (const block of blocks) {
            if (block.miner === address) {
                  balance += block.reward;
                      }

                          for (const transaction of block.transactions) {
                                if (transaction.from === address) {
                                        balance -= transaction.amount;
                                                balance -= transaction.fee;
                                                      }

                                                            if (transaction.to === address) {
                                                                    balance += transaction.amount;
                                                                          }
                                                                              }
                                                                                }

                                                                                  return balance;
                                                                                  }

                                                                                  export function canSpend(
                                                                                    blocks: readonly Block[],
                                                                                      transaction: Transaction,
                                                                                      ): boolean {
                                                                                        if (transaction.amount <= 0n) {
                                                                                            return false;
                                                                                              }

                                                                                                if (transaction.fee < 0n) {
                                                                                                    return false;
                                                                                                      }

                                                                                                        const balance = getBalance(
                                                                                                            blocks,
                                                                                                                transaction.from,
                                                                                                                  );

                                                                                                                    return balance >= transaction.amount + transaction.fee;
                                                                                                                    }