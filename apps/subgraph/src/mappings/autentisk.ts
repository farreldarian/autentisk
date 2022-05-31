import {
  AuthenticityRegistryCreated,
  CollectionCreated,
} from '../../generated/Autentisk/Autentisk'
import {
  AutentiskERC721,
  AuthenticityRegistry,
} from '../../generated/templates'
import { getAccountId, getOrCreateAccount } from '../modules/account'
import { createCollection, getCollectionId } from '../modules/collection'

export function handleCollectionCreated(event: CollectionCreated): void {
  const owner = getOrCreateAccount(getAccountId(event.transaction.from))

  createCollection(
    getCollectionId(event.params.collectionAddress),
    owner.id,
    event.params.collectionAddress
  )
  AutentiskERC721.create(event.params.collectionAddress)
}

export function handleAuthenticityRegistryCreated(
  event: AuthenticityRegistryCreated
): void {
  AuthenticityRegistry.create(event.params.registry)
}
