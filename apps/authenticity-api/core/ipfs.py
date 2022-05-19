IPFS_GATEWAY = 'https://ipfs.io/ipfs/'


def parse_if_ipfs(uri: str):
    if 'ipfs://' not in uri:
        return uri

    return uri.replace('ipfs://', IPFS_GATEWAY)

def get_cid(ipfs_uri: str):
    return ipfs_uri.replace('ipfs://', '')
