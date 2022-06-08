import {
  AskCanceled,
  AskCreated,
  AskFilled,
  AskPriceUpdated,
} from '../../generated/AsksV1_1/AsksV1_1'

export function handleAskCreated(event: AskCreated): void {}

export function handleAskPriceUpdated(event: AskPriceUpdated): void {}

export function handleAskCanceled(event: AskCanceled): void {}

export function handleAskFilled(event: AskFilled): void {}
