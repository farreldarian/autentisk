// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AuthenticityRegistry.sol";
import "../token/AutentiskERC721.sol";

contract Autentisk is Ownable {
    event CollectionCreated(address indexed collectionAddress);
    event AuthenticityRegistryCreated(address indexed registry);

    address public immutable AUTHENTICITY_REGISTRY;

    mapping(AutentiskERC721 => address) public s_collectionOwners;
    uint256 public s_totalCollection;

    constructor(address registry) {
        AUTHENTICITY_REGISTRY = registry;
        emit AuthenticityRegistryCreated(AUTHENTICITY_REGISTRY);
    }

    modifier onlyCollectionOwner(AutentiskERC721 collection) {
        require(
            s_collectionOwners[collection] == msg.sender,
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

        s_collectionOwners[collection] = msg.sender;
        s_totalCollection++;

        emit CollectionCreated(address(collection));
    }

    function mint(
        AutentiskERC721 collection,
        address to,
        string calldata tokenURI,
        string calldata encodedTokenURI
    ) external onlyCollectionOwner(collection) {
        AuthenticityRegistry(AUTHENTICITY_REGISTRY).checkAuthenticity(
            to,
            tokenURI,
            encodedTokenURI,
            address(collection)
        );
    }

    function fulfillMint(
        AutentiskERC721 collection,
        address to,
        string calldata tokenURI
    ) external onlyAuthenticityRegistry {
        collection.mint(to, tokenURI);
    }
}
