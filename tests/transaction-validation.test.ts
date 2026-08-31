import { strict as assert } from "node:assert";
import {
  createTransaction,
    validateTransaction,
    } from "../core/transaction.js";
    import { createWallet } from "../wallet/wallet.js";

    const wallet = createWallet();

    const tx = createTransaction(
      wallet,
        "NPPreceiveraddress123456789",
          100n,
            1n,
            );

            assert.equal(
              validateTransaction(tx),
                true,
                );

                const badTx = {
                  ...tx,
                    amount: 999n,
                    };

                    assert.equal(
                      validateTransaction(badTx),
                        false,
                        );

                        const wrongSender = {
                          ...tx,
                            from: "NPPwrongaddress123456789",
                            };

                            assert.equal(
                              validateTransaction(wrongSender),
                                false,
                                );

                                console.log("Transaction validation test passed.");
                                console.log("Tampered transaction rejection test passed.");
                                console.log("Wrong sender rejection test passed.");