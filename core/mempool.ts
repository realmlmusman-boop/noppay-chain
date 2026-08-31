import type { Transaction } from "./types.js";
import { validateTransaction } from "./transaction.js";

export class Mempool {
  private readonly transactions = new Map<
      string,
          Transaction
            >();

              add(transaction: Transaction): boolean {
                  if (!validateTransaction(transaction)) {
                        return false;
                            }

                                if (this.transactions.has(transaction.id)) {
                                      return false;
                                          }

                                              this.transactions.set(
                                                    transaction.id,
                                                          transaction,
                                                              );

                                                                  return true;
                                                                    }

                                                                      has(transactionId: string): boolean {
                                                                          return this.transactions.has(transactionId);
                                                                            }

                                                                              get(transactionId: string): Transaction | undefined {
                                                                                  return this.transactions.get(transactionId);
                                                                                    }

                                                                                      getAll(): Transaction[] {
                                                                                          return Array.from(
                                                                                                this.transactions.values(),
                                                                                                    );
                                                                                                      }

                                                                                                        remove(transactionId: string): boolean {
                                                                                                            return this.transactions.delete(transactionId);
                                                                                                              }

                                                                                                                clear(): void {
                                                                                                                    this.transactions.clear();
                                                                                                                      }

                                                                                                                        get size(): number {
                                                                                                                            return this.transactions.size;
                                                                                                                              }
                                                                                                                              }