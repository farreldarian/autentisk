import {
  AskCanceled,
  AskCreated,
  AskFilled,
  AskPriceUpdated,
} from '../../generated/AsksV1_1/AsksV1_1'
import { Collection } from '../../generated/schema'
import { getAccountId } from '../modules/account'
import { createAsk, getAskId } from '../modules/ask'
import { getCollectionId } from '../modules/collection'
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
    event.params.ask.askCurrency,
    event.params.ask.askPrice
  )
}

export function handleAskPriceUpdated(event: AskPriceUpdated): void {}

export function handleAskCanceled(event: AskCanceled): void {}

export function handleAskFilled(event: AskFilled): void {}
