import { strict as assert } from "node:assert";

import {
  TOTAL_SUPPLY,
  MINING_REWARD,
  REFERRAL_REWARD,
  MAX_ACCOUNTS_PER_PERSON,
} from "../consensus/economics.js";

assert.equal(TOTAL_SUPPLY, 1_000_000_000n);
assert.equal(MINING_REWARD, 5n);
assert.equal(REFERRAL_REWARD, 20n);
assert.equal(MAX_ACCOUNTS_PER_PERSON, 1);

console.log("Economics test passed.");
