import { startServer, stopServer } from "../node/server.js";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";

async function main() {
  await startServer();

  const sender = createWallet();
  const receiver = createWallet();

  const mineResponse = await fetch("http://localhost:3000/mine", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      minerAddress: sender.address,
    }),
  });

  console.log("Mining HTTP status:", mineResponse.status);
  console.log(await mineResponse.text());

  if (!mineResponse.ok) {
    await stopServer();
    process.exitCode = 1;
    return;
  }

  const tx = createTransaction(
    sender,
    receiver.address,
    3n,
    1n,
  );

  const response = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tx, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  });

  console.log("Sender:", sender.address);
  console.log("Receiver:", receiver.address);
  console.log("HTTP status:", response.status);
  console.log(await response.text());

  await stopServer();

  if (!response.ok) {
    process.exitCode = 1;
  }
}

main().catch(async (error) => {
  console.error(error);
  await stopServer();
  process.exit(1);
});
