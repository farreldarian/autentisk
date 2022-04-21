import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { formatBytes32String, formatEther, parseEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const ORACLE = "0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40";
// const JOB_ID = "d5270d1c311941d0b08bead21fea7747";
const FEE = parseEther("0.01");
const CLASSIFIER_URL = "https://autentisk.vercel.app/api/dummyChainlink";
const SIMILARITY_THRESHOLD = BigNumber.from(1);

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;

  const [signer] = await ethers.getSigners();
  await deploy("Autentisk", {
    from: signer.address,
    args: [
      ORACLE,
      // JOB_ID,
      FEE,
      CLASSIFIER_URL,
      SIMILARITY_THRESHOLD,
    ],
    log: true,
  });
};
export default func;
