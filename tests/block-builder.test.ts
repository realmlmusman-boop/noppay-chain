import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";
import { createBlock } from "../core/block-builder.js";

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

                assert.equal(block.index, 1);
                assert.equal(block.previousHash, "GENESIS");
                assert.equal(block.transactions.length, 1);
                assert.equal(block.miner, miner.address);
                assert.equal(block.reward, 5n);
                assert.ok(block.timestamp > 0);
                assert.ok(block.hash.length > 0);

                console.log("Block creation test passed.");
                console.log("Transaction included in block test passed.");
                console.log("Miner reward included in block test passed.");