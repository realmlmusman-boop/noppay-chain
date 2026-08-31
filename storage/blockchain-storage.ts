import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { mkdir } from "node:fs/promises";

export type StoredBlock = {
  index: number;
  previousHash: string;
  timestamp: number;
  transactions: unknown[];
  miner: string;
  reward: string;
  nonce: number;
  hash: string;
};

export class BlockchainStorage {
  constructor(private readonly filePath: string) {}

  async save(blocks: readonly StoredBlock[]): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });

    await writeFile(
      this.filePath,
      JSON.stringify(blocks, null, 2),
      "utf8",
    );
  }

  async load(): Promise<StoredBlock[]> {
    try {
      const data = await readFile(this.filePath, "utf8");
      const parsed: unknown = JSON.parse(data);

      if (!Array.isArray(parsed)) {
        throw new Error("Stored blockchain must be an array");
      }

      return parsed as StoredBlock[];
    } catch (error) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? (error as { code?: unknown }).code
          : undefined;

      if (code === "ENOENT") {
        return [];
      }

      throw error;
    }
  }
}
