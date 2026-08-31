import { createPrivateKey, createPublicKey, sign, verify } from "node:crypto";

export function signMessage(
  message: string,
    privateKeyPem: string,
    ): string {
      const privateKey = createPrivateKey(privateKeyPem);

        const signature = sign(
            null,
                Buffer.from(message, "utf8"),
                    privateKey,
                      );

                        return signature.toString("base64");
                        }

                        export function verifyMessage(
                          message: string,
                            signatureBase64: string,
                              publicKeyPem: string,
                              ): boolean {
                                const publicKey = createPublicKey(publicKeyPem);

                                  return verify(
                                      null,
                                          Buffer.from(message, "utf8"),
                                              publicKey,
                                                  Buffer.from(signatureBase64, "base64"),
                                                    );
                                                    }