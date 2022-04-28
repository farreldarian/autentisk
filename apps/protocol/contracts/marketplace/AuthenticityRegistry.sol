// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Chainlink, ChainlinkClient} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AutentiskERC721} from "../token/AutentiskERC721.sol";
import {Autentisk} from "./Autentisk.sol";

contract AuthenticityRegistry is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;

    struct AuthenticityRequest {
        string tokenURI;
        address collection;
    }

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

    address public immutable AUTENTISK;

    mapping(bytes32 => address) public s_autentics;
    mapping(bytes32 => AuthenticityRequest) public s_authenticityRequests;

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
        returns (bytes32 requestId_)
    {
        require(
            s_autentics[keccak256(abi.encodePacked(tokenURI))] == address(0),
            "TokenURI has been registered"
        );
        require(bytes(tokenURI).length > 0, "Token URI can't be empty");

        Chainlink.Request memory request = buildChainlinkRequest(
            s_jobId,
            address(this),
            this.fulfillAuthenticity.selector
        );

        request.add("get", makeRequestUrl(tokenURI));

        requestId_ = sendChainlinkRequestTo(s_oracle, request, s_fee);
        s_authenticityRequests[requestId_] = AuthenticityRequest(
            tokenURI,
            collection
        );
    }

    function fulfillAuthenticity(bytes32 requestId, uint256 similarity)
        public
        recordChainlinkFulfillment(requestId)
    {
        AuthenticityRequest memory request = s_authenticityRequests[requestId];
        delete s_authenticityRequests[requestId];

        bytes32 uriSignature = keccak256(abi.encodePacked(request.tokenURI));

        if (isSimilar(similarity)) {
            emit AuthenticityRejected(
                uriSignature,
                request.collection,
                similarity
            );
            return;
        }

        s_autentics[uriSignature] = request.collection;
        emit AuthenticityRegistered(
            uriSignature,
            request.collection,
            similarity
        );

        Autentisk(AUTENTISK).fulfillMint(
            AutentiskERC721(request.collection),
            request.tokenURI
        );
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

    function isSimilar(uint256 similarity) private view returns (bool) {
        return similarity <= s_similarityThreshold;
    }

    function makeRequestUrl(string memory tokenUri)
        private
        view
        returns (string memory url)
    {
        return string.concat(s_classifierUrl, "?tokenUri=", tokenUri);
    }
}
