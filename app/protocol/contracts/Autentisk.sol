// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./AutentiskERC721.sol";

contract Autentisk {
    using Counters for Counters.Counter;

    event CollectionCreated(uint256 indexed collectionId);

    Counters.Counter private collectionIds;
    mapping(uint256 => AutentiskERC721) collections;
    uint256 public totalCollection;

    constructor() {}

    function createCollection(
        string calldata name,
        string calldata symbol,
        address owner
    ) external returns (uint256 id) {
        collectionIds.increment();

        id = collectionIds.current();
        AutentiskERC721 collection = new AutentiskERC721(name, symbol);
        collection.transferOwnership(owner);

        collections[id] = collection;
        totalCollection++;

        emit CollectionCreated(id);
    }
}
