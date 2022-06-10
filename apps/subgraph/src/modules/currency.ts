import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { IERC20Metadata } from '../../generated/AsksV1_1/IERC20Metadata'
import { Currency } from '../../generated/schema'
import { ZERO_ADDRESS } from '../constants'

export function getCurrencyId(address: Address): string {
  return address.toHex()
}

function getERC20Decimal(contract: Address): i32 {
  const erc20 = IERC20Metadata.bind(contract)
  const decimal = erc20.try_decimals()
  if (decimal.reverted) throw new Error('Unrecognized currency!')
  return decimal.value
}

function getERC20Symbol(contract: Address): string {
  const erc20 = IERC20Metadata.bind(contract)
  const decimal = erc20.try_symbol()
  if (decimal.reverted) throw new Error('Unrecognized currency!')
  return decimal.value
}

export function getOrCreateCurrency(id: string): Currency {
  const currency = Currency.load(id)
  if (!currency) return createCurrency(id)
  return currency
}

export function formatCurrency(currency: Currency, wei: BigInt): BigDecimal {
  return wei.divDecimal(
    BigInt.fromI32(10)
      .pow(currency.decimal as u8)
      .toBigDecimal()
  )
}

export function createCurrency(id: string): Currency {
  const currency = new Currency(id)

  if (id == ZERO_ADDRESS) {
    currency.symbol = 'ETH'
    currency.decimal = 18
  } else {
    const address = Address.fromString(id)
    currency.symbol = getERC20Symbol(address)
    currency.decimal = getERC20Decimal(address)
  }

  currency.save()
  return currency
}
