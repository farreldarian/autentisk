import { constants } from 'ethers'
import { useNetwork } from 'wagmi'

export default function useAddress(addresses: {
  [chainId: number]: string
}): string {
  const { chain } = useNetwork()
  if (!chain) return constants.AddressZero
  return addresses[chain.id]
}
