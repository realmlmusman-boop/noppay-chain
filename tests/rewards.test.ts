import { strict as assert } from "node:assert";
import {
  BLOCK_REWARD,
    calculateBlockReward,
      calculateMinerReward,
      } from "../consensus/rewards.js";

      assert.equal(BLOCK_REWARD, 5n);

      assert.equal(
        calculateBlockReward(),
          5n,
          );

          assert.equal(
            calculateMinerReward(0n),
              5n,
              );

              assert.equal(
                calculateMinerReward(5n),
                  5n,
                  );

                  assert.throws(
                    () => calculateMinerReward(-1n),
                      /Transaction fees cannot be negative/,
                      );

                      console.log("Block reward test passed.");
                      console.log("Miner fee reward test passed.");