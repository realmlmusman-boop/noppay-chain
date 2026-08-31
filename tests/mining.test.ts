import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";
import { createBlock } from "../core/block-builder.js";
import {
  calculateMiningHash,
    mineBlock,
      MINING_DIFFICULTY,
      } from "../consensus/mining.js";

      const sender = createWallet();
      const receiver = createWallet();
      const miner = createWallet();

      const transaction = createTransaction(
        sender,
          receiver.address,
            100n,
              2n,
              );

              const block = createBlock(
                1,
                  "GENESIS",
                    [transaction],
                      miner.address,
                      );

                      const result = mineBlock(block);

                      assert.equal(result.hash.length, 64);

                      assert.equal(
                        result.hash.startsWith(
                            "0".repeat(MINING_DIFFICULTY),
                              ),
                                true,
                                );

                                assert.equal(
                                  result.hash,
                                    calculateMiningHash(
                                        block,
                                            result.nonce,
                                              ),
                                              );

                                              assert.ok(result.nonce >= 0);

                                              console.log("Mining test passed.");
                                              console.log("Proof-of-work test passed.");
                                              console.log("Mining hash verification test passed.");