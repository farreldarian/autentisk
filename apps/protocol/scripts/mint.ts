import { ethers } from "hardhat";
import { Autentisk } from "../typechain";

const COLLECTION = "0x8e3Ae17DB4428aCd3eEa5F5d8d1B8DDc43B07561";
const TOKEN_URI = "ipfs://QmdPW4GVWpKszAyiHgswfXktRYsLk7HjrxhA1H7weG6L7B";

async function main() {
  const autentisk = (await ethers.getContract("Autentisk")) as Autentisk;
  const tx = await autentisk.mint(COLLECTION, TOKEN_URI);
  console.log(tx.hash);
  const { blockNumber } = await tx.wait();
  console.log("Confirmed at", blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
