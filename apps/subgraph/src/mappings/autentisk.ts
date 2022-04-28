import {
  AuthenticityRegistryCreated,
  CollectionCreated,
} from "../../generated/Autentisk/Autentisk";
import { AutentiskERC721 } from "../../generated/Autentisk/AutentiskERC721";
import { Collection } from "../../generated/schema";
import {
  AutentiskERC721 as AutentiskERC721Template,
  AuthenticityRegistry,
} from "../../generated/templates";
import { getAccountId, getOrCreateAccount } from "../modules/account";

export function handleCollectionCreated(event: CollectionCreated): void {
  const collection = new Collection(event.params.collectionAddress.toHex());
  collection.owner = getOrCreateAccount(
    getAccountId(event.transaction.from)
  ).id;

  const nft = AutentiskERC721.bind(event.params.collectionAddress);
  collection.name = nft.name();
  collection.symbol = nft.symbol();
  collection.save();

  AutentiskERC721Template.create(event.params.collectionAddress);
}

export function handleAuthenticityRegistryCreated(
  event: AuthenticityRegistryCreated
): void {
  AuthenticityRegistry.create(event.params.registry);
}
