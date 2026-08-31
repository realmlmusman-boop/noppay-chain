import { strict as assert } from "node:assert";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { BlockchainStorage } from "../storage/blockchain-storage.js";

const directory = await mkdtemp(join(tmpdir(), "noppay-storage-"));
const filePath = join(directory, "blockchain.json");

try {
  const storage = new BlockchainStorage(filePath);

    const blocks = [
        {
              index: 0,
                    previousHash: "0",
                          timestamp: 1,
                                transactions: [],
                                      miner: "GENESIS",
                                            reward: "0",
                                                  nonce: 0,
                                                        hash: "GENESIS",
                                                            },
                                                              ];

                                                                await storage.save(blocks);

                                                                  const loaded = await storage.load();

                                                                    assert.deepEqual(loaded, blocks);

                                                                      const raw = await readFile(filePath, "utf8");
                                                                        assert.ok(raw.includes('"GENESIS"'));

                                                                          console.log("Blockchain storage test passed.");
                                                                          } finally {
                                                                            await rm(directory, { recursive: true, force: true });
                                                                            }
