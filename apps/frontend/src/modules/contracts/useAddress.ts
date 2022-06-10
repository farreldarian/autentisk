import { constants } from 'ethers'
import { useNetwork } from 'wagmi'

export default function useAddress(addresses: {
  [chainId: number]: string
}): string {
  const { activeChain } = useNetwork()
  if (!activeChain) return constants.AddressZero
  return addresses[activeChain.id]
}
