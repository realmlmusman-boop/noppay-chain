import { strict as assert } from "node:assert";
import test from "node:test";

import {
    Peer,
        createPeerServer,
        } from "../network/peer.js";

        test("Peer sends and receives messages", async () => {
            const port = 3100;

                const server = createPeerServer(port, (message) => {
                        return {
                                    received: message.type,
                                                data: message.data,
                                                        };
                                                            });

                                                                try {
                                                                        const peer = new Peer("localhost", port);

                                                                                const result = await peer.send({
                                                                                            type: "ping",
                                                                                                        data: {
                                                                                                                        message: "hello",
                                                                                                                                    },
                                                                                                                                            });

                                                                                                                                                    assert.deepEqual(result, {
                                                                                                                                                                received: "ping",
                                                                                                                                                                            data: {
                                                                                                                                                                                            message: "hello",
                                                                                                                                                                                                        },
                                                                                                                                                                                                                });
                                                                                                                                                                                                                    } finally {
                                                                                                                                                                                                                            await new Promise<void>((resolve) => {
                                                                                                                                                                                                                                        server.close(() => resolve());
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                    });