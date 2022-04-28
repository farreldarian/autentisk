import { log } from "@graphprotocol/graph-ts";
import {
  AutentiskERC721,
  Transfer,
} from "../../generated/Autentisk/AutentiskERC721";
import { Account, Token } from "../../generated/schema";

export function handleTokenTransfer(event: Transfer): void {
  const nft = AutentiskERC721.bind(event.address);
  const tokenId = event.params.tokenId;

  if (
    event.params.from.toHex() == "0x0000000000000000000000000000000000000000"
  ) {
    const ownerId = event.params.to.toHex();
    if (!Account.load(ownerId)) {
      const account = new Account(ownerId);
      account.save();
    }

    const token = new Token(event.address.toHex() + "-" + tokenId.toString());
    token.scId = tokenId;
    token.uri = nft.tokenURI(tokenId);
    token.owner = ownerId;
    token.collection = event.address.toHex();
    token.save();
  }
}
