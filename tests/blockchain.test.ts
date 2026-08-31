import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";
import {
  createTransaction,
    validateTransaction,
    } from "../core/transaction.js";

    const sender = createWallet();
    const receiver = createWallet();

    const transaction = createTransaction(
      sender,
        receiver.address,
          100n,
            1n,
            );

            assert.equal(transaction.from, sender.address);
            assert.equal(transaction.to, receiver.address);
            assert.equal(transaction.amount, 100n);
            assert.equal(transaction.fee, 1n);

            assert.equal(
              validateTransaction(transaction),
                true,
                );

                console.log("Blockchain transaction test passed.");