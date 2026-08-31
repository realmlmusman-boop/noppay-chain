import { calculateMinerReward } from "./rewards.js";
import type { Wallet } from "../wallet/wallet.js";

export type MinerReward = {
  miner: string;
    reward: bigint;
    };

    export function calculateBlockMinerReward(
      minerWallet: Wallet,
        transactionFees: bigint,
        ): MinerReward {
          if (!minerWallet.address) {
              throw new Error("Miner wallet address is required");
                }

                  return {
                      miner: minerWallet.address,
                          reward: calculateMinerReward(transactionFees),
                            };
                            }