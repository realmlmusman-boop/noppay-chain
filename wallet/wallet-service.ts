import { createWallet, type Wallet } from "./wallet.js";

export function createNewWallet(): Wallet {
  return createWallet();
}
