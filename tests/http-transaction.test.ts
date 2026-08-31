import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";

async function main() {
  const sender = createWallet();
  const receiver = createWallet();

  const tx = createTransaction(
    sender,
    receiver.address,
    10n,
    1n,
  );

  const response = await fetch(
    "http://localhost:3000/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tx, (_, value) =>
        typeof value === "bigint"
          ? value.toString()
          : value,
      ),
    },
  );

  console.log("Sender:", sender.address);
  console.log("Receiver:", receiver.address);
  console.log("HTTP status:", response.status);
  console.log(await response.text());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
