// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AuthenticityRegistry.sol";
import "../token/AutentiskERC721.sol";

contract Autentisk is Ownable {
    event CollectionCreated(address indexed collectionAddress);



    address immutable AUTHENTICITY_REGISTRY;

    mapping(AutentiskERC721 => address) collectionOwners;
    uint256 public totalCollection;

    constructor(address authenticityRegistry) {
        AUTHENTICITY_REGISTRY = authenticityRegistry;
    }

    modifier onlyCollectionOwner(AutentiskERC721 collection) {
        require(
            collectionOwners[collection] == msg.sender,
            "Autentisk: Not collection owner"
        );
        _;
    }

    modifier onlyAuthenticityRegistry() {
        require(
            msg.sender == AUTHENTICITY_REGISTRY,
            "Autentisk: Not AuthenticityRegistry"
        );
        _;
    }

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
    {
        AuthenticityRegistry(AUTHENTICITY_REGISTRY).checkAuthenticity(tokenURI, collection)
    }

    function fulfillMint(AutentiskERC721 collection, string calldata tokenURI)
        external
        onlyAuthenticityRegistry
    {
        collection.mint(tokenURI);
    }
}
