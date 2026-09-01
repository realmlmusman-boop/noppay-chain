import "../node/server.js";
import { createWallet } from "../wallet/wallet.js";
import { createTransaction } from "../core/transaction.js";

async function main() {
  const miner = createWallet();
    const receiver = createWallet();

      console.log("Miner:", miner.address);
        console.log("Receiver:", receiver.address);

          const mineResponse = await fetch("http://localhost:3000/mine", {
              method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                            },
                                body: JSON.stringify({
                                      minerAddress: miner.address,
                                          }),
                                            });

                                              console.log("Mining status:", mineResponse.status);
                                                console.log(await mineResponse.text());

                                                  const balanceResponse = await fetch(
                                                      `http://localhost:3000/balance?address=${encodeURIComponent(miner.address)}`
                                                        );

                                                          console.log("Miner balance:");
                                                            console.log(await balanceResponse.text());

                                                              const tx = createTransaction(
                                                                  miner,
                                                                      receiver.address,
                                                                          10n,
                                                                              1n,
                                                                                );

                                                                                  const transactionResponse = await fetch(
                                                                                      "http://localhost:3000/transactions",
                                                                                          {
                                                                                                method: "POST",
                                                                                                      headers: {
                                                                                                              "Content-Type": "application/json",
                                                                                                                    },
                                                                                                                          body: JSON.stringify(
                                                                                                                                  tx,
                                                                                                                                          (_, value) =>
                                                                                                                                                    typeof value === "bigint" ? value.toString() : value,
                                                                                                                                                          ),
                                                                                                                                                              },
                                                                                                                                                                );

                                                                                                                                                                  console.log("Transaction status:", transactionResponse.status);
                                                                                                                                                                    console.log(await transactionResponse.text());
                                                                                                                                                                    }

                                                                                                                                                                    main().catch((error) => {
                                                                                                                                                                      console.error(error);
                                                                                                                                                                        process.exit(1);
                                                                                                                                                                        });