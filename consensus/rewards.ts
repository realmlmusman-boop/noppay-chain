export const BLOCK_REWARD = 5n;

export function calculateBlockReward(): bigint {
  return BLOCK_REWARD;
  }

  export function calculateMinerReward(
    transactionFees: bigint,
    ): bigint {
      if (transactionFees < 0n) {
          throw new Error("Transaction fees cannot be negative");
            }

              return BLOCK_REWARD;
              }