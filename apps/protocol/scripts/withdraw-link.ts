import { ethers } from 'hardhat'
import { Autentisk, AuthenticityRegistry__factory } from '../typechain'

async function main() {
  const [signer] = await ethers.getSigners()
  const autentisk = (await ethers.getContract('Autentisk')) as Autentisk
  const registry = AuthenticityRegistry__factory.connect(
    await autentisk.AUTHENTICITY_REGISTRY(),
    signer
  )

  const tx = await registry.withdrawToken(
    '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
  )
  console.log(tx.hash)
  const { blockNumber } = await tx.wait()
  console.log('Confirmed at', blockNumber)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
