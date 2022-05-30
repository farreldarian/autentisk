import { ipfs, json } from '@graphprotocol/graph-ts'
import { TokenMetadata } from '../../generated/schema'

export function tryCreateMetadata(id: string, uri: string): string | null {
  const data = ipfs.cat(uri)
  if (!data) return null

  const obj = json.fromBytes(data).toObject()
  const name = obj.get('name')
  const description = obj.get('description')
  const image = obj.get('image')
  if (!name || !description || !image) return null

  const metadata = new TokenMetadata(id)
  metadata.token = id
  metadata.name = name.toString()
  metadata.description = description.toString()
  metadata.image = image.toString()
  metadata.save()

  return id
}
