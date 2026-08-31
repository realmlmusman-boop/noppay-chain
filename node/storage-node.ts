import { BlockchainStorage } from "../storage/blockchain-storage.js";
import { Blockchain } from "../core/blockchain.js";

export class StorageNode {
  readonly blockchain: Blockchain;
  readonly storage: BlockchainStorage;

  constructor(filePath: string) {
    this.blockchain = new Blockchain();
    this.storage = new BlockchainStorage(filePath);
  }
}