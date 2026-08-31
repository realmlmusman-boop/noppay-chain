import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";
import { calculateBlockMinerReward } from "../consensus/blockchain.js";

const minerWallet = createWallet();

const result = calculateBlockMinerReward(
  minerWallet,
    5n,
    );

    assert.equal(
      result.miner,
        minerWallet.address,
        );

        assert.equal(
          result.reward,
            55n,
            );

            console.log("Blockchain miner reward test passed.");