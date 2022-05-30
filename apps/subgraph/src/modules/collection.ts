import { Address } from '@graphprotocol/graph-ts'
import { AutentiskERC721 } from '../../generated/Autentisk/AutentiskERC721'
import { Collection } from '../../generated/schema'

export function getCollectionId(collection: Address): string {
  return collection.toHex()
}

export function createCollection(
  id: string,
  ownerId: string,
  contract: Address
): void {
  const collection = new Collection(id)
  collection.owner = ownerId

  const nft = AutentiskERC721.bind(contract)
  collection.name = nft.name()
  collection.symbol = nft.symbol()
  collection.save()
}
