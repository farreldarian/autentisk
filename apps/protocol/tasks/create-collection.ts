import { task } from "hardhat/config";
import { Autentisk } from "../typechain";

task("createCollection")
  .addParam("name")
  .addParam("symbol")
  .setAction(async (args, hre) => {
    const { ethers } = hre;

    const autentisk: Autentisk = await ethers.getContract("Autentisk");
    const tx = await autentisk.createCollection(args.name, args.symbol);

    console.log("Sent:", tx.hash);
    const { blockNumber } = await tx.wait();
    console.log("Confirmed:", blockNumber);
  });
