import type { Transaction } from "../core/types.js";
import { Blockchain } from "../core/blockchain.js";
import { Mempool } from "../core/mempool.js";
import { validateTransaction } from "../core/transaction.js";
import {
  canSpend,
    getBalance as calculateBalance,
    } from "../core/balance.js";
    import { Miner } from "../consensus/miner.js";
import { PeerManager } from "../network/peer-manager.js";
import { createPeerServer, type PeerServerHandler } from "../network/peer.js";

    export class Node {
  readonly nodeId: string;
      readonly blockchain: Blockchain;
        readonly mempool: Mempool;
          readonly miner: Miner;
  readonly peerManager = new PeerManager();

            constructor(nodeId = "noppay-node") {
    this.nodeId = nodeId;
                this.blockchain = new Blockchain();
                    this.mempool = new Mempool();
                        this.miner = new Miner(
                              this.blockchain,
                                    this.mempool,
                                        );
                                          }

                                            submitTransaction(
                                                transaction: Transaction,
                                                  ): boolean {
                                                      if (!validateTransaction(transaction)) {
                                                            return false;
                                                                }

                                                                    if (!canSpend(this.blockchain.blocks, transaction)) {
                                                                          return false;
                                                                              }

                                                                                  for (const block of this.blockchain.blocks) {
                                                                                        for (const existing of block.transactions) {
                                                                                                if (existing.id === transaction.id) {
                                                                                                          return false;
                                                                                                                  }
                                                                                                                        }
                                                                                                                            }

                                                                                                                                return this.mempool.add(transaction);
                                                                                                                                  }

                                                                                                                                    mine(minerAddress: string) {
                                                                                                                                        return this.miner.mine(minerAddress);
                                                                                                                                          }

                                                                                                                                            getPendingTransactions(): Transaction[] {
                                                                                                                                                return this.mempool.getAll();
                                                                                                                                                  }

                                                                                                                                                    getBlocks() {
                                                                                                                                                        return this.blockchain.blocks;
                                                                                                                                                          }

                                                                                                                                                            getBalance(address: string): bigint {
                                                                                                                                                                return calculateBalance(
                                                                                                                                                                      this.blockchain.blocks,
                                                                                                                                                                            address,
                                                                                                                                                                                );
                                                                                                                                                                                  }

                                                                                                                                                                                    synchronize(blocks: readonly import("../core/block-builder.js").Block[]): boolean {
    if (blocks.length <= this.blockchain.blocks.length) {
      return false;
    }

    const candidate = new Blockchain();
    candidate.replaceBlocks(blocks);

    if (!candidate.isValid()) {
      return false;
    }

    this.blockchain.replaceBlocks(blocks);
    return true;
  }

  isValid(): boolean {
                                                                                                                                                                                        return this.blockchain.isValid();
                                                                                                                                                                                          }
                                                                                                                                                                                          
  createPeerServer(
    port: number,
    handler: PeerServerHandler,
  ) {
    return createPeerServer(port, handler);
  }

}
