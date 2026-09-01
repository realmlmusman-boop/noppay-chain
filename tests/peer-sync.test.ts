import test from "node:test";
import assert from "node:assert/strict";

import { Node } from "../node/node.js";

test("nodes can prepare blockchain data for peer synchronization", () => {
  const source = new Node();

  const blocks = source.getBlocks();

  assert.ok(Array.isArray(blocks));
  assert.ok(blocks.length >= 1);
  assert.equal(blocks[0]?.index, 0);
});
