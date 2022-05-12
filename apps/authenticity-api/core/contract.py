from web3 import Web3, HTTPProvider
import json
from .env import API_KEY


REGISTRY_DEPLOYMENT_PATH = "../protocol/deployments/maticmum/AuthenticityRegistry.json"


def get_w3():
    return Web3(HTTPProvider(
        f"https://polygon-mumbai.g.alchemy.com/v2/{API_KEY}"))


def get_contract_from_deployment(deployment_path, w3=get_w3()):
    with open(deployment_path) as f:
        deployment = json.load(f)

    registry_address = deployment["address"]
    registry_abi = deployment["abi"]

    return w3.eth.contract(address=registry_address, abi=registry_abi)


def get_registry_contract(w3=get_w3()):
    return get_contract_from_deployment(REGISTRY_DEPLOYMENT_PATH, w3)


def get_request_id(uri, registry=get_registry_contract()):
    uri_sig = Web3.solidityKeccak(['string'], [uri]).hex()
    bytes = registry.functions.s_signatureToRequestId(uri_sig)\
        .call()\
        .hex()\
        .rstrip('0')
    return None if (bytes == '') else "0x" + bytes


def get_authenticity_request(registry=get_registry_contract()):
    return registry.functions.s_authenticityRequests('0xc61182b0799aede42d95381ccf461ecdb57896600bf1641baa957206c1af784b').call()
