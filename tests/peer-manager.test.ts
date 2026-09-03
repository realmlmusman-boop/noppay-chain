import test from "node:test";
import assert from "node:assert/strict";

import { PeerManager } from "../network/peer-manager.js";

test("peer manager adds and tracks peers", () => {
  const manager = new PeerManager();

  const peer = manager.addPeer("127.0.0.1", 3001);

  assert.equal(peer.url, "http://127.0.0.1:3001");
  assert.equal(manager.size, 1);
  assert.equal(manager.hasPeer("127.0.0.1", 3001), true);
});

test("peer manager does not duplicate the same peer", () => {
  const manager = new PeerManager();

  manager.addPeer("127.0.0.1", 3001);
  manager.addPeer("127.0.0.1", 3001);

  assert.equal(manager.size, 1);
});

test("peer manager removes peers", () => {
  const manager = new PeerManager();

  manager.addPeer("127.0.0.1", 3001);

  assert.equal(manager.removePeer("127.0.0.1", 3001), true);
  assert.equal(manager.hasPeer("127.0.0.1", 3001), false);
  assert.equal(manager.size, 0);
});

test("peer manager returns all peers", () => {
  const manager = new PeerManager();

  manager.addPeer("127.0.0.1", 3001);
  manager.addPeer("127.0.0.1", 3002);

  const peers = manager.getPeers();

  assert.equal(peers.length, 2);
  assert.equal(peers[0]?.url, "http://127.0.0.1:3001");
  assert.equal(peers[1]?.url, "http://127.0.0.1:3002");
});
