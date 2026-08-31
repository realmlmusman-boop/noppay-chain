import { strict as assert } from "node:assert";
import { createWallet } from "../wallet/wallet.js";

const wallet = createWallet();

assert.ok(wallet.privateKey.length > 0);
assert.ok(wallet.publicKey.length > 0);
assert.ok(wallet.address.startsWith("NPP"));
assert.equal(wallet.address.length, 27);

const secondWallet = createWallet();

assert.notEqual(
  wallet.address,
    secondWallet.address,
    );

    assert.notEqual(
      wallet.publicKey,
        secondWallet.publicKey,
        );

        console.log("Wallet creation test passed.");