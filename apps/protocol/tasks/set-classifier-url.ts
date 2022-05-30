import { task } from 'hardhat/config'
import { Autentisk, AuthenticityRegistry__factory } from '../typechain'
task('setClassifierUrl')
  .addParam('url')
  .setAction(async (args, hre) => {
    const { ethers } = hre
    const [signer] = await ethers.getSigners()

    const autentisk: Autentisk = await ethers.getContract('Autentisk')
    const registry = AuthenticityRegistry__factory.connect(
      await autentisk.AUTHENTICITY_REGISTRY(),
      signer
    )

    console.log('Updating...')
    const { hash, wait } = await registry.setClassifierUrl(args.url)
    console.log('Sent:', hash)
    const { blockNumber } = await wait()
    console.log('Confirmed:', blockNumber)
  })
