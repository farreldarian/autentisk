// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AuthenticityRegistry.sol";
import "../token/AutentiskERC721.sol";

contract Autentisk is Ownable {
    event CollectionCreated(address indexed collectionAddress);

    address immutable AUTHENTICITY_REGISTRY;

    mapping(AutentiskERC721 => address) collectionOwners;
    uint256 public totalCollection;

    constructor(
        address oracle,
        // bytes32 jobId,
        uint256 fee,
        string memory classifierUrl,
        uint256 similarityThreshold
    ) {
        AUTHENTICITY_REGISTRY = address(
            new AuthenticityRegistry(
                address(this),
                oracle,
                // jobId,
                "d5270d1c311941d0b08bead21fea7747",
                fee,
                classifierUrl,
                similarityThreshold
            )
        );
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
        AuthenticityRegistry(AUTHENTICITY_REGISTRY).checkAuthenticity(
            tokenURI,
            address(collection)
        );
    }

    function fulfillMint(AutentiskERC721 collection, string calldata tokenURI)
        external
        onlyAuthenticityRegistry
    {
        collection.mint(tokenURI);
    }
}
