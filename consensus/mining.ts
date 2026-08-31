import { createHash } from "node:crypto";
import type { Block } from "../core/block-builder.js";

export const MINING_DIFFICULTY = 2;

export type MiningResult = {
  nonce: number;
    hash: string;
    };

    export function calculateMiningHash(
      block: Block,
        nonce: number,
        ): string {
          const data = JSON.stringify({
              index: block.index,
                  previousHash: block.previousHash,
                      timestamp: block.timestamp,
                          transactions: block.transactions.map((tx) => ({
                                ...tx,
                                      amount: tx.amount.toString(),
                                            fee: tx.fee.toString(),
                                                })),
                                                    miner: block.miner,
                                                        reward: block.reward.toString(),
                                                            nonce,
                                                              });

                                                                return createHash("sha256")
                                                                    .update(data)
                                                                        .digest("hex");
                                                                        }

                                                                        export function mineBlock(
                                                                          block: Block,
                                                                            difficulty: number = MINING_DIFFICULTY,
                                                                            ): MiningResult {
                                                                              if (!Number.isInteger(difficulty) || difficulty < 1) {
                                                                                  throw new Error("Difficulty must be a positive integer");
                                                                                    }

                                                                                      if (difficulty > 64) {
                                                                                          throw new Error("Difficulty cannot exceed 64");
                                                                                            }

                                                                                              const target = "0".repeat(difficulty);

                                                                                                let nonce = 0;

                                                                                                  while (true) {
                                                                                                      const hash = calculateMiningHash(
                                                                                                            block,
                                                                                                                  nonce,
                                                                                                                      );

                                                                                                                          if (hash.startsWith(target)) {
                                                                                                                                return {
                                                                                                                                        nonce,
                                                                                                                                                hash,
                                                                                                                                                      };
                                                                                                                                                          }

                                                                                                                                                              nonce++;
                                                                                                                                                                }
                                                                                                                                                                }