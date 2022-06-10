import { store } from '@graphprotocol/graph-ts'
import {
  AskCanceled,
  AskCreated,
  AskFilled,
  AskPriceUpdated,
} from '../../generated/AsksV1_1/AsksV1_1'
import { Ask, AskHistory, Collection } from '../../generated/schema'
import { getAccountId, getOrCreateAccount } from '../modules/account'
import { createAsk, getAskId } from '../modules/ask'
import { getAskHistoryId } from '../modules/ask-history'
import { getCollectionId } from '../modules/collection'
import {
  formatCurrency,
  getCurrencyId,
  getOrCreateCurrency,
} from '../modules/currency'
import { getTokenId } from '../modules/token'

export function handleAskCreated(event: AskCreated): void {
  const collection = Collection.load(
    getCollectionId(event.params.tokenContract)
  )
  if (!collection) return

  createAsk(
    getAskId(event.params.tokenContract, event.params.tokenId),
    getTokenId(event.params.tokenContract, event.params.tokenId),
    getAccountId(event.params.ask.seller),
    getCurrencyId(event.params.ask.askCurrency),
    event.params.ask.askPrice,
    event.block.timestamp
  )
}

export function handleAskPriceUpdated(event: AskPriceUpdated): void {
  const ask = Ask.load(
    getAskId(event.params.tokenContract, event.params.tokenId)
  )
  if (!ask) return

  const currencyId = getCurrencyId(event.params.ask.askCurrency)
  const currency = getOrCreateCurrency(currencyId)
  ask.currency = currencyId
  ask.price = formatCurrency(currency, event.params.ask.askPrice)
  ask.save()
}

export function handleAskCanceled(event: AskCanceled): void {
  store.remove(
    'Ask',
    getAskId(event.params.tokenContract, event.params.tokenId)
  )
}

export function handleAskFilled(event: AskFilled): void {
  const askId = getAskId(event.params.tokenContract, event.params.tokenId)
  const ask = Ask.load(askId)
  if (!ask) return

  const askHistory = new AskHistory(
    getAskHistoryId(
      event.params.tokenContract,
      event.params.tokenId,
      ask.createdAt
    )
  )

  askHistory.token = ask.token
  askHistory.seller = ask.seller
  askHistory.currency = ask.currency
  askHistory.price = ask.price
  askHistory.createdAt = ask.createdAt
  askHistory.buyer = getOrCreateAccount(getAccountId(event.params.buyer)).id
  askHistory.soldAt = event.block.timestamp
  askHistory.save()

  store.remove('Ask', askId)
}
