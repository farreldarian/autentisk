import { etherscanBlockExplorers } from 'wagmi'

export default function getAddressExplorerUrl(address: string) {
  return `${etherscanBlockExplorers.polygonMumbai.url}/address/${address}`
}
