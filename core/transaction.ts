import { createHash } from "node:crypto";
import type { Transaction } from "./types.js";
import type { Wallet } from "../wallet/wallet.js";
import { signMessage, verifyMessage } from "../wallet/signing.js";
import { generateAddress } from "../wallet/address.js";

export function createTransactionId(
  from: string,
    to: string,
      amount: bigint,
        fee: bigint,
          timestamp: number,
          ): string {
            const data = [
                from,
                    to,
                        amount.toString(),
                            fee.toString(),
                                timestamp.toString(),
                                  ].join("|");

                                    return createHash("sha256")
                                        .update(data)
                                            .digest("hex");
                                            }

                                            export function createTransaction(
                                              wallet: Wallet,
                                                to: string,
                                                  amount: bigint,
                                                    fee: bigint,
                                                    ): Transaction {
                                                      const timestamp = Date.now();
                                                        const from = generateAddress(wallet.publicKey);

                                                          const id = createTransactionId(
                                                              from,
                                                                  to,
                                                                      amount,
                                                                          fee,
                                                                              timestamp,
                                                                                );

                                                                                  const signature = signMessage(
                                                                                      id,
                                                                                          wallet.privateKey,
                                                                                            );

                                                                                              return {
                                                                                                  id,
                                                                                                      from,
                                                                                                          to,
                                                                                                              amount,
                                                                                                                  fee,
                                                                                                                      timestamp,
                                                                                                                          publicKey: wallet.publicKey,
                                                                                                                              signature,
                                                                                                                                };
                                                                                                                                }

                                                                                                                                export function validateTransaction(
                                                                                                                                  transaction: Transaction,
                                                                                                                                  ): boolean {
                                                                                                                                    if (!transaction.id) return false;
                                                                                                                                      if (!transaction.from || !transaction.to) return false;
                                                                                                                                        if (transaction.amount <= 0n) return false;
                                                                                                                                          if (transaction.fee < 0n) return false;
                                                                                                                                            if (!transaction.publicKey) return false;
                                                                                                                                              if (!transaction.signature) return false;

                                                                                                                                                const expectedAddress = generateAddress(
                                                                                                                                                    transaction.publicKey,
                                                                                                                                                      );

                                                                                                                                                        if (transaction.from !== expectedAddress) {
                                                                                                                                                            return false;
                                                                                                                                                              }

                                                                                                                                                                const expectedId = createTransactionId(
                                                                                                                                                                    transaction.from,
                                                                                                                                                                        transaction.to,
                                                                                                                                                                            transaction.amount,
                                                                                                                                                                                transaction.fee,
                                                                                                                                                                                    transaction.timestamp,
                                                                                                                                                                                      );

                                                                                                                                                                                        if (transaction.id !== expectedId) {
                                                                                                                                                                                            return false;
                                                                                                                                                                                              }

                                                                                                                                                                                                return verifyMessage(
                                                                                                                                                                                                    transaction.id,
                                                                                                                                                                                                        transaction.signature,
                                                                                                                                                                                                            transaction.publicKey,
                                                                                                                                                                                                              );
                                                                                                                                                                                                              }