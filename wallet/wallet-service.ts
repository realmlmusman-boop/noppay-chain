import { createWallet, type Wallet } from "./wallet.js";

export function createNewWallet(): Wallet {
  return createWallet();
}

export function isValidWalletAddress(address: string): boolean {
  return address.startsWith("NPP") && address.length === 27;
}
