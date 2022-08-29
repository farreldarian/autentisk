import { constants } from 'ethers'
import { useAccount } from 'wagmi'

export default function useFallbackAccountAddress() {
  const { address } = useAccount()
  if (address) return { address: address, fallback: false }
  else return { address: constants.AddressZero, fallback: true }
}
