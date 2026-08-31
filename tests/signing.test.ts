import { strict as assert } from "node:assert";
import { generateWalletKeys } from "../wallet/keys.js";
import {
  signMessage,
    verifyMessage,
    } from "../wallet/signing.js";

    const keys = generateWalletKeys();

    const message = "Noppay Chain transaction";

    const signature = signMessage(
      message,
        keys.privateKey,
        );

        assert.equal(
          verifyMessage(
              message,
                  signature,
                      keys.publicKey,
                        ),
                          true,
                          );

                          assert.equal(
                            verifyMessage(
                                "Different message",
                                    signature,
                                        keys.publicKey,
                                          ),
                                            false,
                                            );

                                            console.log("Message signing test passed.");