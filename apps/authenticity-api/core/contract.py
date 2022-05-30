from web3 import Web3, HTTPProvider
import json
from .env import API_KEY
from .unit import format_ether


REGISTRY_DEPLOYMENT_PATH = "../protocol/deployments/maticmum/AuthenticityRegistry.json"

REGISTRY_ADDRESS = '0xd0446A1D209fDE32A76A1f6118791378f9f6C919'
REGISTRY_ABI = '[{ "inputs": [ { "internalType": "address", "name": "controller", "type": "address" }, { "internalType": "address", "name": "autentisk", "type": "address" }, { "internalType": "address", "name": "oracle", "type": "address" }, { "internalType": "string", "name": "jobId", "type": "string" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }, { "internalType": "string", "name": "classifierUrl", "type": "string" }, { "internalType": "uint256", "name": "similarityThreshold", "type": "uint256" }, { "internalType": "address", "name": "link", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "requestId", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "similarity", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "isAccepted", "type": "bool" } ], "name": "AuthenticityFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "uriSignature", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "collection", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "requestId", "type": "bytes32" } ], "name": "AuthenticityRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" } ], "name": "ChainlinkCancelled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" } ], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" } ], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "value", "type": "string" } ], "name": "ClassifierUrlChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "prevOracle", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newOracle", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "jobId", "type": "bytes32" } ], "name": "OracleChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "AUTENTISK", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "string", "name": "encodedTokenURI", "type": "string" }, { "internalType": "address", "name": "collection", "type": "address" } ], "name": "checkAuthenticity", "outputs": [ { "internalType": "bytes32", "name": "requestId_", "type": "bytes32" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "similarity", "type": "uint256" } ], "name": "fulfillAuthenticity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "s_autentics", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "s_authenticityRequests", "outputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "address", "name": "collection", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_classifierUrl", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_fee", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_jobId", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_oracle", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "s_signatureToRequestId", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "s_similarityThreshold", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "value", "type": "string" } ], "name": "setClassifierUrl", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_oracle", "type": "address" }, { "internalType": "bytes32", "name": "_jobId", "type": "bytes32" }, { "internalType": "uint256", "name": "_fee", "type": "uint256" } ], "name": "setOracle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "token", "type": "address" } ], "name": "withdrawToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]'


def get_w3():
    return Web3(HTTPProvider(
        f"https://polygon-mumbai.g.alchemy.com/v2/{API_KEY}"))


def get_contract_from_deployment(deployment_path, w3=get_w3()):
    # with open(deployment_path) as f:
    #     deployment = json.load(f)

    # registry_address = deployment["address"]
    # registry_abi = deployment["abi"]
    registry_address = REGISTRY_ADDRESS
    registry_abi = REGISTRY_ABI

    return w3.eth.contract(address=registry_address, abi=registry_abi)


def get_registry_contract(w3=get_w3()):
    return get_contract_from_deployment(REGISTRY_DEPLOYMENT_PATH, w3)


def get_sig(uri):
    return Web3.solidityKeccak(['string'], [uri]).hex()


def get_request_id(uri, registry=get_registry_contract()):
    uri_sig = get_sig(uri)
    bytes = registry.functions.s_signatureToRequestId(uri_sig)\
        .call()\
        .hex()\
        .rstrip('0')
    return None if (bytes == '') else "0x" + bytes


def get_similarity_threshold(registry=get_registry_contract()):
    return format_ether(registry.functions.s_similarityThreshold().call())


def get_authenticity_request(registry=get_registry_contract()):
    return registry.functions.s_authenticityRequests('0xc61182b0799aede42d95381ccf461ecdb57896600bf1641baa957206c1af784b').call()
