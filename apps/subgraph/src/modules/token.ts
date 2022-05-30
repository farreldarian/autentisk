import { Address, BigInt } from '@graphprotocol/graph-ts'
import {
  AutentiskERC721,
  Transfer,
} from '../../generated/Autentisk/AutentiskERC721'
import { Token } from '../../generated/schema'
import { ZERO_ADDRESS } from '../constants'
import { tryCreateMetadata } from './token-metadata'

export function isMint(event: Transfer): boolean {
  return event.params.from.toHex() == ZERO_ADDRESS
}

export function getTokenId(collection: Address, scId: BigInt): string {
  return collection.toHex() + '-' + scId.toString()
}

export function createToken(
  id: string,
  scId: BigInt,
  contract: Address,
  ownerId: string,
  collectionId: string
): void {
  const nft = AutentiskERC721.bind(contract)

  const token = new Token(id)
  token.scId = scId
  token.uri = nft.tokenURI(scId)
  token.metadata = tryCreateMetadata(id, token.uri)
  token.owner = ownerId
  token.collection = collectionId
  token.save()
}
