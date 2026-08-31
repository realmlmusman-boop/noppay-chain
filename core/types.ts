export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: bigint;
  fee: bigint;
  timestamp: number;
  publicKey: string;
  signature: string;
};

export type Block = {
  index: number;
  previousHash: string;
  timestamp: number;
  transactions: Transaction[];
  nonce: number;
  hash: string;
};