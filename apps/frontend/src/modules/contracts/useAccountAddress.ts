import { constants } from 'ethers'
import { useAccount } from 'wagmi'

export default function useAccountAddress(): string {
  const { address } = useAccount()
  if (!address) return constants.AddressZero
  return address
}
