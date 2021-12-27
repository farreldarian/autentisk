// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./dependencies/ChainlinkClient.sol";
import "./AutentiskERC721.sol";

contract Autentisk is Ownable, ChainlinkClient {
    using Chainlink for Chainlink.Request;

    event CollectionCreated(address indexed collectionAddress);
    event OracleChanged(
        address indexed previousOracle,
        address indexed newOracle,
        bytes32 jobId
    );

    modifier onlyCollectionOwner(AutentiskERC721 collection) {
        require(
            collectionOwners[collection] == msg.sender,
            "Caller is not the owner"
        );
        _;
    }

    mapping(AutentiskERC721 => address) collectionOwners;
    uint256 public totalCollection;

    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    constructor(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee
    ) {
        setPublicChainlinkToken();
        setOracle(_oracle, _jobId, _fee);
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
        returns (uint256)
    {
        return collection.mint(tokenURI);
    }

    function setOracle(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee
    ) public onlyOwner {
        require(_oracle != 0, "Invalid oracle address");

        address prevOracle = oracle;

        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;

        emit OracleChanged(prevOracle, _oracle, _jobId);
    }
}
