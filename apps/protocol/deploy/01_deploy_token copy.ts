import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;

  const [signer] = await ethers.getSigners();
  await deploy("AutentiskERC721", {
    from: signer.address,
    args: ["Autentisk", "AUT"],
    log: true,
  });
};
export default func;
