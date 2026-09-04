import { strict as assert } from "node:assert";

import { MINING_REWARD } from "../consensus/economics.js";

assert.equal(MINING_REWARD, 5n);

console.log("Mining reward policy test passed.");
