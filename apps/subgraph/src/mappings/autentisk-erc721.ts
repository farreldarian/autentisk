import { Transfer } from '../../generated/Autentisk/AutentiskERC721'
import { getAccountId, getOrCreateAccount } from '../modules/account'
import { getCollectionId } from '../modules/collection'
import { createToken, getTokenId, isMint } from '../modules/token'

export function handleTokenTransfer(event: Transfer): void {
  if (isMint(event)) {
    const to = getOrCreateAccount(getAccountId(event.params.to))
    createToken(
      getTokenId(event.address, event.params.tokenId),
      event.params.tokenId,
      event.address,
      to.id,
      getCollectionId(event.address),
      event.block.timestamp
    )
  }
}
