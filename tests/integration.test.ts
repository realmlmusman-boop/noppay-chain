import { strict as assert } from "node:assert";

import { createWallet } from "../wallet/wallet.js";
import {
  createTransaction,
    validateTransaction,
    } from "../core/transaction.js";
    import { Blockchain } from "../core/blockchain.js";
    import { Mempool } from "../core/mempool.js";
    import { Miner } from "../consensus/miner.js";
    import { getBalance } from "../core/balance.js";

    const sender = createWallet();
    const receiver = createWallet();
    const minerWallet = createWallet();

    const blockchain = new Blockchain();
    const mempool = new Mempool();
    const miner = new Miner(
      blockchain,
        mempool,
        );

        const transaction = createTransaction(
          sender,
            receiver.address,
              100n,
                1n,
                );

                assert.equal(
                  transaction.from,
                    sender.address,
                    );

                    assert.equal(
                      transaction.to,
                        receiver.address,
                        );

                        assert.equal(
                          validateTransaction(transaction),
                            true,
                            );

                            assert.equal(
                              mempool.add(transaction),
                                true,
                                );

                                assert.equal(
                                  mempool.size,
                                    1,
                                    );

                                    const block = miner.mine(
                                      minerWallet.address,
                                      );

                                      assert.equal(
                                        block.transactions.length,
                                          1,
                                          );

                                          assert.equal(
                                            block.transactions[0]?.id,
                                              transaction.id,
                                              );

                                              assert.equal(
                                                mempool.size,
                                                  0,
                                                  );

                                                  assert.equal(
                                                    blockchain.latestBlock.hash,
                                                      block.hash,
                                                      );

                                                      assert.equal(
                                                        blockchain.isValid(),
                                                          true,
                                                          );

                                                          assert.equal(
                                                            getBalance(
                                                                blockchain.blocks,
                                                                    receiver.address,
                                                                      ),
                                                                        100n,
                                                                        );

                                                                        assert.equal(
                                                                          getBalance(
                                                                              blockchain.blocks,
                                                                                  sender.address,
                                                                                    ),
                                                                                      -101n,
                                                                                      );

                                                                                      console.log(
                                                                                        "Wallet transaction creation test passed.",
                                                                                        );

                                                                                        console.log(
                                                                                          "Transaction validation test passed.",
                                                                                          );

                                                                                          console.log(
                                                                                            "Mempool integration test passed.",
                                                                                            );

                                                                                            console.log(
                                                                                              "Mining integration test passed.",
                                                                                              );

                                                                                              console.log(
                                                                                                "Blockchain integration test passed.",
                                                                                                );

                                                                                                console.log(
                                                                                                  "Balance integration test passed.",
                                                                                                  );