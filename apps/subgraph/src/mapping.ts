import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  AdminApproved,
  AdminRevoked,
  ApprovalForAll,
  CollectionActivated,
  CollectionDeactivated,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleAdminApproved(event: AdminApproved): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.account = event.params.account
  entity.sender = event.params.sender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.active(...)
  // - contract.balanceOf(...)
  // - contract.balanceOf(...)
  // - contract.balanceOfBatch(...)
  // - contract.claimEndTime(...)
  // - contract.claimStartTime(...)
  // - contract.endTime(...)
  // - contract.getAdmins(...)
  // - contract.getFeeBps(...)
  // - contract.getFeeRecipients(...)
  // - contract.getRoyalties(...)
  // - contract.isAdmin(...)
  // - contract.isApprovedForAll(...)
  // - contract.maxSupply(...)
  // - contract.nonceUsed(...)
  // - contract.owner(...)
  // - contract.presaleInterval(...)
  // - contract.presalePurchaseLimit(...)
  // - contract.presalePurchasePrice(...)
  // - contract.purchaseCount(...)
  // - contract.purchaseLimit(...)
  // - contract.purchaseMax(...)
  // - contract.purchasePrice(...)
  // - contract.purchaseRemaining(...)
  // - contract.reserveCount(...)
  // - contract.royaltyInfo(...)
  // - contract.startTime(...)
  // - contract.state(...)
  // - contract.supportsInterface(...)
  // - contract.transactionLimit(...)
  // - contract.transferLocked(...)
  // - contract.uri(...)
  // - contract.useDynamicPresalePurchaseLimit(...)
}

export function handleAdminRevoked(event: AdminRevoked): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleCollectionActivated(event: CollectionActivated): void {}

export function handleCollectionDeactivated(
  event: CollectionDeactivated
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}
