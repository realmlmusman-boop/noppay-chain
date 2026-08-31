import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";
import { Blockchain } from "../core/blockchain.js";
import {
  canSpend,
    getBalance,
    } from "../core/balance.js";

    const sender = createWallet();
    const receiver = createWallet();
    const miner = createWallet();

    const blockchain = new Blockchain();

    assert.equal(
      getBalance(blockchain.blocks, miner.address),
        0n,
        );

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

                    assert.equal(
                      getBalance(blockchain.blocks, miner.address),
                        block.reward,
                        );

                        assert.equal(
                          getBalance(blockchain.blocks, receiver.address),
                            100n,
                            );

                            assert.equal(
                              getBalance(blockchain.blocks, sender.address),
                                -102n,
                                );

                                const spendableTransaction = createTransaction(
                                  miner,
                                    receiver.address,
                                      block.reward - 1n,
                                        0n,
                                        );

                                        assert.equal(
                                          canSpend(
                                              blockchain.blocks,
                                                  spendableTransaction,
                                                    ),
                                                      true,
                                                      );

                                                      const tooExpensiveTransaction = createTransaction(
                                                        miner,
                                                          receiver.address,
                                                            block.reward + 1n,
                                                              0n,
                                                              );

                                                              assert.equal(
                                                                canSpend(
                                                                    blockchain.blocks,
                                                                        tooExpensiveTransaction,
                                                                          ),
                                                                            false,
                                                                            );

                                                                            console.log("Initial balance test passed.");
                                                                            console.log("Miner reward balance test passed.");
                                                                            console.log("Receiver balance test passed.");
                                                                            console.log("Sender balance and fee test passed.");
                                                                            console.log("Spendable balance test passed.");
                                                                            console.log("Insufficient balance rejection test passed.");