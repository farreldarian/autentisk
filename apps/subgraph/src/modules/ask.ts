import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { IERC20Metadata } from '../../generated/AsksV1_1/IERC20Metadata'
import { Ask } from '../../generated/schema'
import { ZERO_ADDRESS } from '../constants'

export function getAskId(collection: Address, tokenId: BigInt): string {
  return `${collection}-${tokenId}`
}

export function createAsk(
  id: string,
  tokenId: string,
  sellerId: string,
  currency: Address,
  price: BigInt
): void {
  const ask = new Ask(id)
  ask.token = tokenId
  ask.seller = sellerId
  ask.currency = currency.toHex()
  if (currency.toHex() == ZERO_ADDRESS) {
    ask.price = price.divDecimal(BigDecimal.fromString('1e18'))
  } else {
    const erc20 = IERC20Metadata.bind(currency)
    const decimal = erc20.try_decimals()
    if (!decimal.reverted) {
      ask.price = price.divDecimal(
        BigDecimal.fromString(decimal.value.toString())
      )
    } else {
      throw new Error("Can't get decimal")
    }
  }
}
