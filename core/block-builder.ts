import { createHash } from "node:crypto";
import type { Transaction } from "./types.js";
import { validateTransaction } from "./transaction.js";
import { calculateMinerReward } from "../consensus/rewards.js";

export type Block = {
  index: number;
    previousHash: string;
      timestamp: number;
        transactions: Transaction[];
          miner: string;
            reward: bigint;
              nonce: number;
                hash: string;
                };

                export function calculateBlockHash(
                  index: number,
                    previousHash: string,
                      timestamp: number,
                        transactions: Transaction[],
                          miner: string,
                            reward: bigint,
                              nonce: number = 0,
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
                                                                          miner,
                                                                              reward: reward.toString(),
                                                                                  nonce,
                                                                                    });

                                                                                      return createHash("sha256")
                                                                                          .update(data)
                                                                                              .digest("hex");
                                                                                              }

                                                                                              export function createBlock(
                                                                                                index: number,
                                                                                                  previousHash: string,
                                                                                                    transactions: Transaction[],
                                                                                                      miner: string,
                                                                                                      ): Block {
                                                                                                        if (!miner) {
                                                                                                            throw new Error("Miner address is required");
                                                                                                              }

                                                                                                                for (const transaction of transactions) {
                                                                                                                    if (!validateTransaction(transaction)) {
                                                                                                                          throw new Error("Invalid transaction");
                                                                                                                              }
                                                                                                                                }

                                                                                                                                  const timestamp = Date.now();

                                                                                                                                    const transactionFees = transactions.reduce(
                                                                                                                                        (total, transaction) => total + transaction.fee,
                                                                                                                                            0n,
                                                                                                                                              );

                                                                                                                                                const reward = calculateMinerReward(
                                                                                                                                                    transactionFees,
                                                                                                                                                      );

                                                                                                                                                        const nonce = 0;

                                                                                                                                                          const hash = calculateBlockHash(
                                                                                                                                                              index,
                                                                                                                                                                  previousHash,
                                                                                                                                                                      timestamp,
                                                                                                                                                                          transactions,
                                                                                                                                                                              miner,
                                                                                                                                                                                  reward,
                                                                                                                                                                                      nonce,
                                                                                                                                                                                        );

                                                                                                                                                                                          return {
                                                                                                                                                                                              index,
                                                                                                                                                                                                  previousHash,
                                                                                                                                                                                                      timestamp,
                                                                                                                                                                                                          transactions,
                                                                                                                                                                                                              miner,
                                                                                                                                                                                                                  reward,
                                                                                                                                                                                                                      nonce,
                                                                                                                                                                                                                          hash,
                                                                                                                                                                                                                            };
                                                                                                                                                                                                                            }