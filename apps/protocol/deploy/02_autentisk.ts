import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const registryDeployment = await deployments.get('AuthenticityRegistry')

  await deploy('Autentisk', {
    from: deployer,
    args: [registryDeployment.address],
    log: true,
  })
}
export default func
