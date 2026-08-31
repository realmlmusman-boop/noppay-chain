import { strict as assert } from "node:assert";
import { generateWalletKeys } from "../wallet/keys.js";

const keys = generateWalletKeys();

assert.equal(typeof keys.publicKey, "string");
assert.equal(typeof keys.privateKey, "string");

assert.ok(keys.publicKey.length > 0);
assert.ok(keys.privateKey.length > 0);

assert.notEqual(keys.publicKey, keys.privateKey);

const secondKeys = generateWalletKeys();

assert.notEqual(keys.publicKey, secondKeys.publicKey);
assert.notEqual(keys.privateKey, secondKeys.privateKey);

console.log("Wallet key generation test passed.");