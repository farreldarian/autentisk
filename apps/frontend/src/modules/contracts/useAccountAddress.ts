import { constants } from 'ethers'
import { useAccount } from 'wagmi'

export default function useAccountAddress(): string {
  const { data } = useAccount()
  if (!data?.address) return constants.AddressZero
  return data.address
}
