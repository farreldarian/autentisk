import { ethers } from "hardhat";
import { Autentisk } from "../typechain";

async function main() {
  const autentisk = (await ethers.getContract("Autentisk")) as Autentisk;
  const tx = await autentisk.createCollection("Univ Ape", "APE");
  console.log(tx.hash);
  const { blockNumber } = await tx.wait();
  console.log("Confirmed at", blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
