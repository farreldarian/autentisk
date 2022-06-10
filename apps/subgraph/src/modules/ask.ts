import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Ask } from '../../generated/schema'
import { formatCurrency, getOrCreateCurrency } from './currency'

export function getAskId(collection: Address, tokenId: BigInt): string {
  return `${collection.toHex()}-${tokenId.toString()}`
}

export function createAsk(
  id: string,
  tokenId: string,
  sellerId: string,
  currencyId: string,
  price: BigInt,
  createdAt: BigInt
): void {
  const ask = new Ask(id)
  ask.token = tokenId
  ask.seller = sellerId

  const currency = getOrCreateCurrency(currencyId)
  ask.currency = currencyId
  ask.price = formatCurrency(currency, price)
  ask.createdAt = createdAt

  ask.save()
}

export function fillAsk(id: string, buyerId: string): void {
  const ask = Ask.load(id)
  if (!ask) throw new Error('Null ask')

  ask.buyer = buyerId
  ask.save()
}
