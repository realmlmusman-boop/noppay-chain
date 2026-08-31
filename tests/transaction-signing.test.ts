import { strict as assert } from "node:assert";
import { createTransaction } from "../core/transaction.js";
import { createWallet } from "../wallet/wallet.js";
import { verifyMessage } from "../wallet/signing.js";

const wallet = createWallet();

const transaction = createTransaction(
  wallet,
    "NPPreceiveraddress123456789",
      100n,
        1n,
        );

        assert.ok(transaction.id);
        assert.ok(transaction.publicKey);
        assert.ok(transaction.signature);

        assert.equal(
          verifyMessage(
              transaction.id,
                  transaction.signature,
                      transaction.publicKey,
                        ),
                          true,
                          );

                          console.log("Transaction signing test passed.");