import getIpfs from './get-ipfs'
import pinToIpfs from './pin-to-ipfs'

export default async function pinFile(file: File, client = getIpfs()) {
  return pinToIpfs({ content: file }, client)
}
