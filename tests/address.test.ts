import { strict as assert } from "node:assert";
import { generateAddress } from "../wallet/address.js";

const publicKey = "test-public-key";

const address = generateAddress(publicKey);

assert.ok(address.startsWith("NPP"));
assert.equal(address.length, 27);

const sameAddress = generateAddress(publicKey);

assert.equal(address, sameAddress);

const differentAddress = generateAddress(
  "different-public-key",
);

assert.notEqual(address, differentAddress);

console.log("Address generation test passed.");