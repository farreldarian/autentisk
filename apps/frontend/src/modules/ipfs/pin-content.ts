import getIpfs from './get-ipfs'
import pinToIpfs from './pin-to-ipfs'

export default async function pinContent(content: string, client = getIpfs()) {
  return pinToIpfs(content, client)
}
