import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { parseEther } from 'ethers/lib/utils'
import { ethers as _ethers } from 'hardhat'
import type { DeployFunction } from 'hardhat-deploy/types'
import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { AuthenticityRegistry__factory } from '../typechain'
import { erc20 } from '../typechain/factories/@openzeppelin/contracts/token'

const LINK_ADDRESS = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb'
const ORACLE = '0xc8D925525CA8759812d0c299B90247917d4d4b7C'
const JOB_ID = 'bbf0badad29d49dc887504bacfbb905b'
const FEE = parseEther('0.01')
const CLASSIFIER_URL = 'https://autentisk-production.up.railway.app/'
const SIMILARITY_THRESHOLD = parseEther('0.3')

async function estimateAddress(
  ethers: typeof _ethers,
  deployer: SignerWithAddress,
  afterTx: number = 1
) {
  const { keccak256, RLP, hexlify } = ethers.utils
  const nonce = await deployer.getTransactionCount()
  return (
    '0x' +
    keccak256(RLP.encode([deployer.address, hexlify(nonce + afterTx)])).slice(
      26
    )
  )
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre
  const { deploy, getOrNull } = deployments
  const { deployer, controller } = await ethers.getNamedSigners()

  const existing = await getOrNull('AuthenticityRegistry')
  if (existing) {
    const link = erc20.IERC20__factory.connect(LINK_ADDRESS, deployer)
    if (!(await link.balanceOf(existing.address)).eq(0)) {
      const contract = AuthenticityRegistry__factory.connect(
        existing.address,
        deployer
      )
      console.log('Withdrawing LINK from existing contract ')
      await contract.withdrawToken(LINK_ADDRESS).then((tx) => tx.wait())
      console.log('Link withdrawn!')
    }
  }

  const autentisk = await estimateAddress(ethers, deployer, 2)

  const registry = await deploy('AuthenticityRegistry', {
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
  })

  console.log('Sending 0.1 LINK')
  const link = erc20.IERC20__factory.connect(LINK_ADDRESS, deployer)
  await link
    .transfer(registry.address, parseEther('0.1'))
    .then((tx) => tx.wait())
  console.log('Registry is ready to be used!')
}
export default func
