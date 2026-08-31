import { createHash } from "node:crypto";
import type { Block, Transaction } from "./types.js";

export function calculateBlockHash(
  index: number,
    previousHash: string,
      timestamp: number,
        transactions: Transaction[],
          nonce: number,
          ): string {
            const data = JSON.stringify({
                index,
                    previousHash,
                        timestamp,
                            transactions: transactions.map((tx) => ({
                                  ...tx,
                                        amount: tx.amount.toString(),
                                              fee: tx.fee.toString(),
                                                  })),
                                                      nonce,
                                                        });

                                                          return createHash("sha256").update(data).digest("hex");
                                                          }

                                                          export function createBlock(
                                                            index: number,
                                                              previousHash: string,
                                                                transactions: Transaction[],
                                                                ): Block {
                                                                  const timestamp = Date.now();
                                                                    const nonce = 0;

                                                                      const hash = calculateBlockHash(
                                                                          index,
                                                                              previousHash,
                                                                                  timestamp,
                                                                                      transactions,
                                                                                          nonce,
                                                                                            );

                                                                                              return {
                                                                                                  index,
                                                                                                      previousHash,
                                                                                                          timestamp,
                                                                                                              transactions,
                                                                                                                  nonce,
                                                                                                                      hash,
                                                                                                                        };
                                                                                                                        }