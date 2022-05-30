import { ethers } from 'hardhat'
import { Autentisk } from '../typechain'

async function main() {
  const autentisk = (await ethers.getContract('Autentisk')) as Autentisk
  console.log(await autentisk.AUTHENTICITY_REGISTRY())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
