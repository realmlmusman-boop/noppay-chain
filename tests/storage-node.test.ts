import { strict as assert } from "node:assert";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { StorageNode } from "../node/storage-node.js";

test("StorageNode saves and loads blockchain", async () => {
    const directory = await mkdtemp(join(tmpdir(), "noppay-storage-node-"));
        const filePath = join(directory, "blockchain.json");

            try {
                    const firstNode = new StorageNode(filePath);

                            const miner = "NPPtest-miner";
                                    const block = firstNode.blockchain.addBlock([], miner);

                                            await firstNode.save();

                                                    const secondNode = new StorageNode(filePath);

                                                            await secondNode.load();

                                                                    assert.equal(secondNode.blockchain.blocks.length, 2);

                                                                            const loadedBlock = secondNode.blockchain.blocks[1]!;

                                                                                    assert.equal(loadedBlock.index, block.index);
                                                                                            assert.equal(loadedBlock.previousHash, block.previousHash);
                                                                                                    assert.equal(loadedBlock.timestamp, block.timestamp);
                                                                                                            assert.equal(loadedBlock.miner, block.miner);
                                                                                                                    assert.equal(loadedBlock.reward, block.reward);
                                                                                                                            assert.equal(loadedBlock.nonce, block.nonce);
                                                                                                                                    assert.equal(loadedBlock.hash, block.hash);

                                                                                                                                            assert.equal(secondNode.blockchain.isValid(), true);
                                                                                                                                                } finally {
                                                                                                                                                        await rm(directory, { recursive: true, force: true });
                                                                                                                                                            }
                                                                                                                                                            });