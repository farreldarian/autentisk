import { ethers } from 'hardhat'
import { Autentisk } from '../typechain'

const COLLECTION = '0xF8506fBfA89438295BD58D6331485fFBC8C89225'
const TOKEN_URI = 'ipfs://QmdPW4GVWpKszAyiHgswfXktRYsLk7HjrxhA1H7weG6L7B'

async function main() {
  const [signer] = await ethers.getSigners()
  const autentisk = (await ethers.getContract('Autentisk')) as Autentisk
  const tx = await autentisk.mint(COLLECTION, signer.address, TOKEN_URI)
  console.log(tx.hash)
  const { blockNumber } = await tx.wait()
  console.log('Confirmed at', blockNumber)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
