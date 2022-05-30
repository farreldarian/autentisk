import { IPFS_GATEWAY } from '../../constants'

export function parseIfIpfs(uri: string) {
  return uri.replace('ipfs://', IPFS_GATEWAY + '/')
}
