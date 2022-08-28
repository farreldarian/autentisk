IPFS_GATEWAY = 'https://autentisk.infura-ipfs.io/ipfs/'


def parse_if_ipfs(uri: str):
    if 'ipfs://' not in uri:
        return uri

    return uri.replace('ipfs://', IPFS_GATEWAY)
