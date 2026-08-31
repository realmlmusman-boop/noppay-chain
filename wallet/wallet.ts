import { generateWalletKeys } from "./keys.js";
import { generateAddress } from "./address.js";

export type Wallet = {
  privateKey: string;
    publicKey: string;
      address: string;
      };

      export function createWallet(): Wallet {
        const keys = generateWalletKeys();

          const address = generateAddress(keys.publicKey);

            return {
                privateKey: keys.privateKey,
                    publicKey: keys.publicKey,
                        address,
                          };
                          }