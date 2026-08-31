import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";
import { Mempool } from "../core/mempool.js";

const sender = createWallet();
const receiver = createWallet();

const mempool = new Mempool();

const transaction = createTransaction(
  sender,
    receiver.address,
      100n,
        2n,
        );

        assert.equal(
          mempool.add(transaction),
            true,
            );

            assert.equal(
              mempool.size,
                1,
                );

                assert.equal(
                  mempool.has(transaction.id),
                    true,
                    );

                    assert.deepEqual(
                      mempool.get(transaction.id),
                        transaction,
                        );

                        assert.deepEqual(
                          mempool.getAll(),
                            [transaction],
                            );

                            assert.equal(
                              mempool.add(transaction),
                                false,
                                );

                                assert.equal(
                                  mempool.size,
                                    1,
                                    );

                                    assert.equal(
                                      mempool.remove(transaction.id),
                                        true,
                                        );

                                        assert.equal(
                                          mempool.size,
                                            0,
                                            );

                                            assert.equal(
                                              mempool.has(transaction.id),
                                                false,
                                                );

                                                assert.equal(
                                                  mempool.remove(transaction.id),
                                                    false,
                                                    );

                                                    console.log("Mempool add test passed.");
                                                    console.log("Mempool duplicate rejection test passed.");
                                                    console.log("Mempool retrieval test passed.");
                                                    console.log("Mempool removal test passed.");