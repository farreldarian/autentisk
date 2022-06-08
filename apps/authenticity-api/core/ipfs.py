IPFS_GATEWAY = 'https://ipfs.infura.io:5001/api/v0'


def parse_if_ipfs(uri: str):
    if 'ipfs://' not in uri:
        return uri

    return uri.replace('ipfs://', IPFS_GATEWAY)
