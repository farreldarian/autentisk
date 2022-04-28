import {
  AutentiskERC721,
  Transfer,
} from "../../generated/Autentisk/AutentiskERC721";
import { Account, Token } from "../../generated/schema";
import { getAccountId, getOrCreateAccount } from "../modules/account";

export function handleTokenTransfer(event: Transfer): void {
  const nft = AutentiskERC721.bind(event.address);
  const tokenId = event.params.tokenId;

  if (
    event.params.from.toHex() == "0x0000000000000000000000000000000000000000"
  ) {
    const to = getOrCreateAccount(getAccountId(event.params.to));

    const token = new Token(event.address.toHex() + "-" + tokenId.toString());
    token.scId = tokenId;
    token.uri = nft.tokenURI(tokenId);
    token.owner = to.id;
    token.collection = event.address.toHex();
    token.save();
  }
}
