// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../token/AutentiskERC721.sol";
import "../libraries/Address.sol";

contract AuthenticityRegistry is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;
    using Address for address;

    event OracleChanged(address prevOracle, address newOracle, bytes32 jobId);
    event AuthenticityRegistered(
        bytes32 uriSignature,
        address collection,
        uint256 similarityThreshold
    );
    event AuthenticityRejected(
        bytes32 uriSignature,
        address collection,
        uint256 similarityThreshold
    );

    address immutable AUTENTISK;

    mapping(bytes32 => address) public s_autentics;

    string public s_classifierUrl;
    uint256 public s_similarityThreshold;

    address public s_oracle;
    bytes32 public s_jobId;
    uint256 public s_fee;

    constructor(
        address autentisk,
        address oracle,
        bytes32 jobId,
        uint256 fee,
        string memory classifierUrl,
        uint256 similarityThreshold
    ) {
        AUTENTISK = autentisk;
        setPublicChainlinkToken();
        setOracle(oracle, jobId, fee);
        s_classifierUrl = classifierUrl;
        s_similarityThreshold = similarityThreshold;
    }

    modifier onlyAutentisk() {
        require(msg.sender == AUTENTISK, "AuthenticityRegistry: Not Autentisk");
        _;
    }

    function checkAuthenticity(string calldata tokenURI, address collection)
        external
        onlyAutentisk
        returns (bytes32 requestId)
    {
        require(
            keccak256(tokenURI) == address(0),
            "TokenURI has been registered"
        );
        require(tokenURI.length > 0, "Token URI can't be empty");

        Chainlink.Request memory request = buildChainlinkRequest(
            s_jobId,
            address(this),
            this.fulfillAuthenticity.selector
        );

        request.add("get", makeRequestUrl(tokenURI, collection));

        return sendChainlinkRequestTo(s_oracle, request, s_fee);
    }

    function fulfillAuthenticity(bytes32 requestId, bytes calldata data)
        public
        recordChainlinkFulfillment(requestId)
    {
        (
            string memory tokenURI,
            address collection,
            uint256 closestSimilarity
        ) = abi.decode(data, (string, address, uint256));

        bytes32 uriSignature = keccak256(tokenURI);

        if (isSimilar(closestSimilarity)) {
            emit AuthenticityRejected(uriSignature, closestSimilarity);
            return;
        }

        s_autentics[uriSignature] = collection;
        emit AuthenticityRegistered(uriSignature, closestSimilarity);
    }

    function setOracle(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee
    ) public onlyOwner {
        require(_oracle != address(0), "Invalid oracle address");

        address prevOracle = s_oracle;

        s_oracle = _oracle;
        s_jobId = _jobId;
        s_fee = _fee;

        emit OracleChanged(prevOracle, _oracle, _jobId);
    }

    function isSimilar(uint256 similarity) private returns (bool) {
        return similarity <= s_similarityThreshold;
    }

    function makeRequestUrl(string memory tokenUri, address collection)
        private
        view
        returns (string memory url)
    {
        return
            string.concat(
                s_classifierUrl,
                "?tokenUri=",
                tokenUri,
                "&collection=",
                collection.toHexString()
            );
    }
}
