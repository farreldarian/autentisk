import json
from urllib.request import urlopen
from .ipfs import parse_if_ipfs


def get_image_url(token_uri: str):
    url = parse_if_ipfs(token_uri)
    res = urlopen(url)
    metadata = json.loads(res.read())
    image = metadata["image"]
    return None if image is None else parse_if_ipfs(image)
