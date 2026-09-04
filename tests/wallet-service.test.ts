import assert from "node:assert/strict";
import test from "node:test";
import { createNewWallet, isValidWalletAddress } from "../wallet/wallet-service.js";

test("wallet service creates a wallet", () => {
  const wallet = createNewWallet();

  assert.equal(typeof wallet.address, "string");
  assert.ok(wallet.address.startsWith("NPP"));
  assert.equal(typeof wallet.privateKey, "string");
});

test("wallet service validates wallet addresses", () => {
  const wallet = createNewWallet();

  assert.equal(isValidWalletAddress(wallet.address), true);
  assert.equal(isValidWalletAddress("NPP123"), false);
  assert.equal(isValidWalletAddress(""), false);
});
