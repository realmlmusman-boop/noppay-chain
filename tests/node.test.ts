import { strict as assert } from "node:assert";
import { Node } from "../node/node.js";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";

const node = new Node();

const miner = createWallet();
const receiver = createWallet();
const secondMiner = createWallet();

// First mining: miner gets exactly 5 NOPPAY.
const mineBlock = node.mine(miner.address);
assert.equal(mineBlock.reward, 5n);
assert.equal(node.getBalance(miner.address), 5n);

// The miner can spend up to the 5 NOPPAY balance,
// including the transaction fee.
const transaction = createTransaction(
  miner,
    receiver.address,
      3n,
        1n,
        );

        assert.equal(node.submitTransaction(transaction), true);
        assert.equal(node.mempool.size, 1);
        assert.equal(node.getPendingTransactions().length, 1);

        // Use a different miner because the first miner must wait 24 hours
        // before receiving another mining reward.
        const block = node.mine(secondMiner.address);

        assert.equal(block.reward, 5n);
        assert.equal(block.transactions.length, 1);
        assert.equal(block.transactions[0]?.id, transaction.id);
        assert.equal(node.mempool.size, 0);

        // Sender: 5 - 3 - 1 = 1 NOPPAY.
        assert.equal(node.getBalance(miner.address), 1n);

        // Receiver receives 3 NOPPAY.
        assert.equal(node.getBalance(receiver.address), 3n);

        // Second miner gets exactly 5 NOPPAY.
        assert.equal(node.getBalance(secondMiner.address), 5n);

        assert.equal(node.getBlocks().length, 3);
        assert.equal(node.isValid(), true);

        // The same transaction cannot be submitted twice.
        assert.equal(node.submitTransaction(transaction), false);

        console.log("Node transaction submission test passed.");
        console.log("Node pending transaction test passed.");
        console.log("Node mining test passed.");
        console.log("Node blockchain test passed.");
        console.log("Node duplicate transaction rejection test passed.");