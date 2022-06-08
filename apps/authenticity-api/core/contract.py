from typing import Optional
from web3 import Web3, HTTPProvider
from .constants.deployed_contracts import DEPLOYED_CONTRACTS
from .env import API_KEY
from .unit import format_ether


def get_w3() -> Web3:
    return Web3(HTTPProvider(
        f"https://polygon-mumbai.g.alchemy.com/v2/{API_KEY}"))


def get_registry_contract(w3: Web3 = get_w3()):
    deployment = DEPLOYED_CONTRACTS[80001]["AuthenticityRegistry"]
    return w3.eth.contract(address=deployment['address'], abi=deployment['abi'])


def get_sig(uri: str) -> str:
    return Web3.solidityKeccak(['string'], [uri]).hex()


def get_request_id(uri: str, registry=get_registry_contract()):
    uri_sig = get_sig(uri)
    bytes = registry.functions.s_signatureToRequestId(uri_sig)\
        .call()\
        .hex()\
        .rstrip('0')
    return None if (bytes == '') else "0x" + bytes


def get_similarity_threshold(registry=get_registry_contract()):
    return format_ether(registry.functions.s_similarityThreshold().call())
