import { BigNumber, constants } from "ethers";
import { keccak256, parseEther } from "ethers/lib/utils";
import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers as _ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const ORACLE = "0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40";
const JOB_ID = "3b7ca0d48c7a4b2da9268456665d11ae";
const FEE = parseEther("0.01");
const CLASSIFIER_URL = "https://autentisk-production.up.railway.app/";
const SIMILARITY_THRESHOLD = BigNumber.from(1);

async function estimateAddress(
  ethers: typeof _ethers,
  deployer: SignerWithAddress
) {
  const { keccak256, RLP, hexlify } = ethers.utils;
  const nonce = await deployer.getTransactionCount();
  return (
    "0x" +
    keccak256(RLP.encode([deployer.address, hexlify(nonce + 1)])).slice(26)
  );
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;
  const { deployer, controller } = await ethers.getNamedSigners();

  const autentisk = await estimateAddress(ethers, deployer);

  await deploy("AuthenticityRegistry", {
    from: deployer.address,
    args: [
      controller.address,
      autentisk,
      ORACLE,
      JOB_ID,
      FEE,
      CLASSIFIER_URL,
      SIMILARITY_THRESHOLD,
      "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    ],
    log: true,
  });
};
export default func;
