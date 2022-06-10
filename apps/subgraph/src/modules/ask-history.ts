import { Address, BigInt } from '@graphprotocol/graph-ts'

export function getAskHistoryId(
  collection: Address,
  tokenId: BigInt,
  creationTime: BigInt
): string {
  return `${collection.toHex()}-${tokenId.toString()}-${creationTime.toString()}`
}
