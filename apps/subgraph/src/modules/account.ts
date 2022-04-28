import { Address } from "@graphprotocol/graph-ts";
import { Account } from "../../generated/schema";

export function getAccountId(address: Address): string {
  return address.toHex();
}

export function getOrCreateAccount(id: string): Account {
  let account = Account.load(id);
  if (!account) {
    account = new Account(id);
    account.save();
  }
  return account;
}
