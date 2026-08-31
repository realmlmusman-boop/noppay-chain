import { strict as assert } from "node:assert";
import { Blockchain } from "../core/blockchain.js";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";

const blockchain = new Blockchain();

const sender = createWallet();
const receiver = createWallet();
const miner = createWallet();

const transaction = createTransaction(
  sender,
    receiver.address,
      100n,
        2n,
        );

        const block = blockchain.addBlock(
          [transaction],
            miner.address,
            );

            assert.equal(blockchain.blocks.length, 2);
            assert.equal(block.index, 1);
            assert.equal(block.previousHash, "GENESIS");
            assert.equal(block.transactions.length, 1);
            assert.equal(block.miner, miner.address);
            assert.equal(block.reward, 52n);

            assert.equal(blockchain.latestBlock.hash, block.hash);
            assert.equal(blockchain.isValid(), true);

            console.log("Blockchain creation test passed.");
            console.log("Block added to chain test passed.");
            console.log("Blockchain validation test passed.");