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

test("node rejects a shorter peer chain", () => {
  const source = new Node();
  const target = new Node();

  source.mine("miner-1");

  const longerChain = source.getBlocks();
  const shorterChain = longerChain.slice(0, 1);

  const synchronized = target.synchronize(shorterChain);

  assert.equal(synchronized, false);
  assert.equal(target.getBlocks().length, 1);
  assert.equal(target.isValid(), true);
});

test("node rejects a same-length peer chain", () => {
  const source = new Node();
  const target = new Node();

  source.mine("miner-1");
  target.mine("miner-2");

  const sourceBlocks = source.getBlocks();
  const targetBlocks = target.getBlocks();

  assert.equal(sourceBlocks.length, 2);
  assert.equal(targetBlocks.length, 2);

  const synchronized = target.synchronize(sourceBlocks);

  assert.equal(synchronized, false);
  assert.equal(target.getBlocks().length, 2);
  assert.equal(target.isValid(), true);
});

test("node rejects an invalid longer peer chain", () => {
  const source = new Node();
  const target = new Node();

  source.mine("miner-1");
  source.mine("miner-1");

  const sourceBlocks = source.getBlocks();
  const invalidBlocks = sourceBlocks.map((block) => ({ ...block }));

  invalidBlocks[1] = {
    ...invalidBlocks[1],
    hash: "INVALID",
  };

  assert.equal(invalidBlocks.length, 3);
  assert.equal(target.getBlocks().length, 1);

  const synchronized = target.synchronize(invalidBlocks);

  assert.equal(synchronized, false);
  assert.equal(target.getBlocks().length, 1);
  assert.equal(target.isValid(), true);
});


test("node can send a message to a managed peer", async () => {
  const source = new Node();
  const target = new Node();

  const server = source.createPeerServer(3001, async (message) => {
    return {
      received: message,
    };
  });

  source.peerManager.addPeer("127.0.0.1", 3001);

  const peer = source.peerManager.getPeers()[0];
  assert.ok(peer);

  const result = await peer.send({
    type: "ping",
    data: {
      node: "source",
    },
  });

  assert.deepEqual(result, {
    received: {
      type: "ping",
      data: {
        node: "source",
      },
    },
  });

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});


test("node can receive a message through its peer server", async () => {
  const node = new Node();
  const server = node.createPeerServer(3002, async (message) => {
    return {
      type: "ack",
      receivedType: message.type,
    };
  });

  const peer = new (await import("../network/peer.js")).Peer(
    "127.0.0.1",
    3002,
  );

  const result = await peer.send({
    type: "ping",
  });

  assert.deepEqual(result, {
    type: "ack",
    receivedType: "ping",
  });

  server.close();
});


test("node can synchronize blockchain through a peer message", async () => {
  const source = new Node();
  const target = new Node();

  source.mine("miner-1");

  const server = source.createPeerServer(3006, async (message) => {
    if (message.type === "get-blocks") {
      return {
        type: "blocks",
        data: source.getBlocks(),
      };
    }

    return {
      type: "error",
    };
  });

  target.peerManager.addPeer("127.0.0.1", 3006);

  const peer = target.peerManager.getPeers()[0];
  assert.ok(peer);

  const result = await peer.send({
    type: "get-blocks",
  });

  assert.equal((result as { type: string }).type, "blocks");

  const blocks = (result as {
    type: string;
    data: readonly import("../core/block-builder.js").Block[];
  }).data;

  const synchronized = target.synchronize(blocks);

  assert.equal(synchronized, true);
  assert.equal(target.getBlocks().length, 2);
  assert.equal(target.isValid(), true);

  server.close();
});

test("node can respond to a peer handshake message", async () => {
  const node = new Node();

  const server = node.createPeerServer(3004, async (message) => {
    if (message.type === "handshake") {
      return {
        type: "handshake",
        data: {
          node: "noppay-node",
        },
      };
    }

    return {
      type: "error",
    };
  });

  const peer = node.peerManager.addPeer("127.0.0.1", 3004);

  const result = await peer.send({
    type: "handshake",
  });

  assert.equal((result as { type: string }).type, "handshake");
  assert.deepEqual(
    (result as { data: { node: string } }).data,
    { node: "noppay-node" },
  );

  server.close();
});
