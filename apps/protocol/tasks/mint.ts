import { task } from 'hardhat/config'
import { Autentisk } from '../typechain'

task('mint')
  .addParam('collection')
  .addParam('uri')
  .setAction(async (args, hre) => {
    const { ethers } = hre
    const [signer] = await ethers.getSigners()

    const autentisk: Autentisk = await ethers.getContract('Autentisk')
    const tx = await autentisk.mint(
      args.collection,
      signer.address,
      args.uri,
      encodeURIComponent(args.uri)
    )

    console.log('Sent:', tx.hash)
    const { blockNumber } = await tx.wait()
    console.log('Confirmed:', blockNumber)
  })
