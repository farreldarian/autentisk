import type { ImportCandidate } from 'ipfs-core-types/types/src/utils'
import getIpfs from './get-ipfs'

export default async function pinToIpfs(
  entry: ImportCandidate,
  client = getIpfs()
) {
  try {
    const { cid } = await client.add(entry, { cidVersion: 1, pin: true })
    return cid
  } catch {
    return undefined
  }
}
