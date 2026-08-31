import { generateKeyPairSync } from "node:crypto";

export type WalletKeys = {
  privateKey: string;
  publicKey: string;
};

export function generateWalletKeys(): WalletKeys {
  const keys = generateKeyPairSync("ed25519");

  return {
    privateKey: keys.privateKey
      .export({
        type: "pkcs8",
        format: "pem",
      })
      .toString(),

    publicKey: keys.publicKey
      .export({
        type: "spki",
        format: "pem",
      })
      .toString(),
  };
}
