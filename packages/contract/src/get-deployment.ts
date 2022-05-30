import contracts from './constants/deployed-contracts'

export default function getDeployment(chainId: number, contract: string) {
  return contracts[chainId][contract]
}
