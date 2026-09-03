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

test("node exposes its blockchain for synchronization", () => {
  const source = new Node();
  const blocks = source.getBlocks();

  assert.ok(blocks.length >= 1);
  assert.equal(blocks[0]?.index, 0);
  assert.equal(blocks[0]?.miner, "GENESIS");
});

test("node accepts a valid longer chain from a peer", () => {
  const source = new Node();
  const target = new Node();

  source.mine("miner-1");

  const sourceBlocks = source.getBlocks();

  assert.equal(sourceBlocks.length, 2);
  assert.equal(target.getBlocks().length, 1);

  const synchronized = target.synchronize(sourceBlocks);

  assert.equal(synchronized, true);
  assert.equal(target.getBlocks().length, 2);
  assert.equal(target.isValid(), true);
});
