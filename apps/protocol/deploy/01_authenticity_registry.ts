import { BigNumber, constants } from "ethers";
import { keccak256, parseEther } from "ethers/lib/utils";
import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers as _ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const LINK_ADDRESS = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb";
const ORACLE = "0xc8D925525CA8759812d0c299B90247917d4d4b7C";
const JOB_ID = "bbf0badad29d49dc887504bacfbb905b";
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
      LINK_ADDRESS,
    ],
    log: true,
  });
};
export default func;
