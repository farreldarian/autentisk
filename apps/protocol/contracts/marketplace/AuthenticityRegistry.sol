// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Chainlink, ChainlinkClient} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AutentiskERC721} from "../token/AutentiskERC721.sol";
import {Autentisk} from "./Autentisk.sol";

contract AuthenticityRegistry is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;

    struct AuthenticityRequest {
        address to;
        string tokenURI;
        address collection;
    }

    event OracleChanged(address prevOracle, address newOracle, bytes32 jobId);
    event ClassifierUrlChanged(string value);
    event AuthenticityRequested(
        bytes32 uriSignature,
        address collection,
        bytes32 requestId
    );
    event AuthenticityFulfilled(
        bytes32 requestId,
        uint256 similarity,
        bool isAccepted
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
        setClassifierUrl(classifierUrl);
        s_similarityThreshold = similarityThreshold;
    }

    modifier onlyAutentisk() {
        require(msg.sender == AUTENTISK, "AuthenticityRegistry: Not Autentisk");
        _;
    }

    function withdrawToken(IERC20 token) external {
        SafeERC20.safeTransfer(
            token,
            Autentisk(AUTENTISK).owner(),
            IERC20(token).balanceOf(address(this))
        );
    }

    function checkAuthenticity(
        address to,
        string calldata tokenURI,
        address collection
    ) external onlyAutentisk returns (bytes32 requestId_) {
        bytes32 uriSignature = keccak256(abi.encodePacked(tokenURI));
        require(
            s_autentics[uriSignature] == address(0),
            "TokenURI has been registered"
        );
        require(bytes(tokenURI).length > 0, "Token URI can't be empty");

        Chainlink.Request memory request = buildChainlinkRequest(
            s_jobId,
            address(this),
            this.fulfillAuthenticity.selector
        );

        request.add("get", makeRequestUrl(tokenURI));
        request.add("path", "similarity");

        requestId_ = sendChainlinkRequestTo(s_oracle, request, s_fee);
        s_authenticityRequests[requestId_] = AuthenticityRequest(
            to,
            tokenURI,
            collection
        );

        emit AuthenticityRequested(uriSignature, collection, requestId_);
    }

    function fulfillAuthenticity(bytes32 requestId, uint256 similarity)
        public
        recordChainlinkFulfillment(requestId)
    {
        AuthenticityRequest memory request = s_authenticityRequests[requestId];
        delete s_authenticityRequests[requestId];

        bytes32 uriSignature = keccak256(abi.encodePacked(request.tokenURI));

        if (isSimilar(similarity)) {
            emit AuthenticityFulfilled(requestId, similarity, false);
            return;
        }

        s_autentics[uriSignature] = request.collection;
        emit AuthenticityFulfilled(requestId, similarity, true);

        Autentisk(AUTENTISK).fulfillMint(
            AutentiskERC721(request.collection),
            request.to,
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

    function setClassifierUrl(string memory value) public onlyOwner {
        s_classifierUrl = value;
        emit ClassifierUrlChanged(value);
    }

    function isSimilar(uint256 similarity) private view returns (bool) {
        return similarity >= s_similarityThreshold;
    }

    function makeRequestUrl(string memory tokenUri)
        private
        view
        returns (string memory url)
    {
        return string.concat(s_classifierUrl, "?tokenUri=", tokenUri);
    }
}
