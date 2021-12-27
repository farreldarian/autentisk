// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./AutentiskERC721.sol";

contract Autentisk {
    event CollectionCreated(address indexed collectionAddress);

    modifier onlyCollectionOwner(AutentiskERC721 collection) {
        require(
            collectionOwners[collection] == msg.sender,
            "Caller is not the owner"
        );
        _;
    }

    mapping(AutentiskERC721 => address) collectionOwners;
    uint256 public totalCollection;

    constructor() {}

    function createCollection(string calldata name, string calldata symbol)
        external
    {
        AutentiskERC721 collection = new AutentiskERC721(name, symbol);

        collectionOwners[collection] = msg.sender;
        totalCollection++;

        emit CollectionCreated(address(collection));
    }

    function mint(AutentiskERC721 collection, string calldata tokenURI)
        external
        onlyCollectionOwner(collection)
        returns (uint256)
    {
        return collection.mint(tokenURI);
    }
}
