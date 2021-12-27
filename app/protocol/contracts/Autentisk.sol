// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./AutentiskERC721.sol";

contract Autentisk {
    event CollectionCreated(address indexed collectionAddress);

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
}
