import { CollectionCreated } from "../generated/Autentisk/Autentisk";
import { AutentiskERC721 } from "../generated/Autentisk/AutentiskERC721";
import { Collection } from "../generated/schema";
import { AutentiskERC721 as AutentiskERC721Template } from "../generated/templates";

export function handleCollectionCreated(event: CollectionCreated): void {
  const collection = new Collection(event.params.collectionAddress.toHex());
  collection.owner = event.transaction.from.toHex();

  const nft = AutentiskERC721.bind(event.params.collectionAddress);
  collection.name = nft.name();
  collection.symbol = nft.symbol();
  collection.save();

  AutentiskERC721Template.create(event.params.collectionAddress);
}
