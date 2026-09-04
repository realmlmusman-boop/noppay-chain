import { strict as assert } from "node:assert";

import { Blockchain } from "../core/blockchain.js";
import { Mempool } from "../core/mempool.js";
import { Miner } from "../consensus/miner.js";
import { createTransaction } from "../core/transaction.js";
import { createWallet } from "../wallet/wallet.js";

const blockchain = new Blockchain();
const mempool = new Mempool();
const miner = new Miner(blockchain, mempool);

const sender = createWallet();
const receiver = createWallet();
const minerWallet = createWallet();

const transaction = createTransaction(
  sender,
  receiver.address,
  10n,
  1n,
);

assert.equal(mempool.add(transaction), true);
assert.equal(mempool.size, 1);

const block = miner.mine(minerWallet.address);

assert.equal(block.transactions.length, 1);
assert.equal(block.transactions[0]?.id, transaction.id);
assert.equal(block.miner, minerWallet.address);
assert.equal(mempool.size, 0);
assert.equal(mempool.has(transaction.id), false);
assert.equal(blockchain.latestBlock.hash, block.hash);
assert.equal(blockchain.isValid(), true);

console.log("Miner transaction selection test passed.");
console.log("Transaction included in mined block test passed.");
console.log("Mempool cleared after mining test passed.");
console.log("Blockchain valid after mining test passed.");

const cooldownBlockchain = new Blockchain();
const cooldownMempool = new Mempool();
const cooldownMiner = new Miner(cooldownBlockchain, cooldownMempool);
const cooldownWallet = createWallet();

const firstBlock = cooldownMiner.mine(cooldownWallet.address);

assert.equal(firstBlock.reward, 5n);

assert.throws(
  () => cooldownMiner.mine(cooldownWallet.address),
  /24 hours/i,
);

console.log("24-hour mining cooldown test passed.");
