import { strict as assert } from "node:assert";
import { Node } from "../node/node.js";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";

const node = new Node();

const receiver = createWallet();
const miner = createWallet();

const mineBlock = node.mine(miner.address);

assert.equal(mineBlock.reward, 50n);

const transaction = createTransaction(
  miner,
    receiver.address,
      25n,
        2n,
        );

        assert.equal(
          node.submitTransaction(transaction),
            true,
            );

            assert.equal(node.mempool.size, 1);

            assert.equal(
              node.getPendingTransactions().length,
                1,
                );

                const block = node.mine(miner.address);

                assert.equal(block.transactions.length, 1);

                assert.equal(
                  block.transactions[0]?.id,
                    transaction.id,
                    );

                    assert.equal(node.mempool.size, 0);

                    assert.equal(node.getBlocks().length, 3);

                    assert.equal(node.isValid(), true);

                    assert.equal(
                      node.submitTransaction(transaction),
                        false,
                        );

                        console.log("Node transaction submission test passed.");
                        console.log("Node pending transaction test passed.");
                        console.log("Node mining test passed.");
                        console.log("Node blockchain test passed.");
                        console.log("Node duplicate transaction rejection test passed.");