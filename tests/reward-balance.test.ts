import { startServer, stopServer } from "../node/server.js";
import { createWallet } from "../wallet/wallet.js";

async function main() {
  await startServer();

  try {
    const miner = createWallet();

    const mineResponse = await fetch(
      "http://localhost:3000/mine",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minerAddress: miner.address,
        }),
      },
    );

    console.log("Miner:", miner.address);
    console.log("Mining HTTP status:", mineResponse.status);
    console.log(await mineResponse.text());

    const balanceResponse = await fetch(
      `http://localhost:3000/balance?address=${encodeURIComponent(miner.address)}`,
    );

    console.log("Balance HTTP status:", balanceResponse.status);
    console.log(await balanceResponse.text());
  } finally {
    await stopServer();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
