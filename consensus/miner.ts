import type { Transaction } from "../core/types.js";
import { Blockchain } from "../core/blockchain.js";
import { Mempool } from "../core/mempool.js";

const MINING_INTERVAL_MS = 24 * 60 * 60 * 1000;

export class Miner {
  private readonly lastMinedAt = new Map<string, number>();

  constructor(
    private readonly blockchain: Blockchain,
    private readonly mempool: Mempool,
  ) {}

  mine(minerAddress: string) {
    if (!minerAddress) {
      throw new Error("Miner address is required");
    }

    const lastMinedAt = this.lastMinedAt.get(minerAddress);

    if (
      lastMinedAt !== undefined &&
      Date.now() - lastMinedAt < MINING_INTERVAL_MS
    ) {
      throw new Error("Miner must wait 24 hours between mining rewards");
    }

    const transactions = this.mempool.getAll();
    const block = this.blockchain.addBlock(transactions, minerAddress);

    for (const transaction of transactions) {
      this.mempool.remove(transaction.id);
    }

    this.lastMinedAt.set(minerAddress, Date.now());

    return block;
  }

  getPendingTransactions(): Transaction[] {
    return this.mempool.getAll();
  }
}
