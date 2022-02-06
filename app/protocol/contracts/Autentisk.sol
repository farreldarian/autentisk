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

    string public classifierUrl;
    uint256 public similarityThreshold;

    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    constructor(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee,
        string memory _classifierUrl,
        uint256 _similarityThreshold
    ) {
        setPublicChainlinkToken();
        setOracle(_oracle, _jobId, _fee);
        classifierUrl = _classifierUrl;
        similarityThreshold = _similarityThreshold;
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
    {}

    function checkAuthenticity(bytes32[] calldata tokenUris) external {
        require(tokenUris.length > 0, "Token URI can't be empty");

        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        request.add("get", makeRequestUrl(tokenUris));

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfillAuthenticity(bytes32 requestId, bytes calldata data)
        public
        recordChainlinkFulfillment(requestId)
    {
        (
            AutentiskERC721 collection,
            string calldata tokenURI,
            uint256 closestSimilarity
        ) = abi.decode(data, (address, string, uint256));

        if (isSimilar(closestSimilarity)) {
            revert("");
        }

        collection.mint();
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

    function isSimilar(uint256 similarity) private returns (bool) {
        return similarity <= similarityThreshold;
    }

    function makeRequestUrl(bytes32[] calldata tokenUris)
        private
        pure
        returns (string memory url)
    {
        url = abi.encodePacked(classifierUrl, "?");
        for (uint256 i = 0; i < tokenUris.length; i++) {
            url = abi.encodePacked("tokenUri[]=", string(tokenUris[i]));
        }
    }
}
