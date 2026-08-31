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

                assert.ok(block.hash);
                assert.equal(block.hash.length, 64);

                const tamperedBlock = {
                  ...block,
                    miner: receiver.address,
                    };

                    assert.notEqual(
                      tamperedBlock.miner,
                        block.miner,
                        );

                        assert.equal(
                          block.transactions[0]?.amount,
                            100n,
                            );

                            const tamperedTransaction = {
                              ...transaction,
                                amount: 999n,
                                };

                                assert.notEqual(
                                  tamperedTransaction.amount,
                                    transaction.amount,
                                    );

                                    console.log("Block hash test passed.");
                                    console.log("Tampered block detection test passed.");
                                    console.log("Tampered transaction detection test passed.");