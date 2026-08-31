import { createHash } from "node:crypto";

export function generateAddress(publicKey: string): string {
  const hash = createHash("sha256")
      .update(publicKey, "utf8")
          .digest("hex");

            return `NPP${hash.slice(0, 24)}`;
            }