import { providers } from 'ethers'
import type { Deployment } from 'hardhat-deploy/types'
import path from 'path'

export default async function getDeployment(
  chainId: number,
  contract: string
): Promise<Deployment> {
  const network = providers.getNetwork(chainId)
  const resolved = path.resolve(
    __dirname,
    `../../../apps/protocol/deployments/${network.name}/${contract}.json`
  )
  return (await import(resolved)).default
}
