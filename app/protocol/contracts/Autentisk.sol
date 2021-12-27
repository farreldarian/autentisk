// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./AutentiskERC721.sol";

contract Autentisk {
    using Counters for Counters.Counter;

    struct Collection {
        AutentiskERC721 collection;
        address owner;
    }

    event CollectionCreated(uint256 indexed collectionId);

    Counters.Counter private collectionIds;
    mapping(uint256 => Collection) collections;
    uint256 public totalCollection;

    constructor() {}

    function createCollection(string calldata name, string calldata symbol)
        external
        returns (uint256 id)
    {
        collectionIds.increment();

        id = collectionIds.current();
        AutentiskERC721 collection = new AutentiskERC721(name, symbol);

        collections[id] = Collection({
            collection: collection,
            owner: msg.sender
        });
        totalCollection++;

        emit CollectionCreated(id);
    }
}
