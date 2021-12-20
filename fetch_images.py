import os
import yaml
import requests
import filetype
from helpers.dataset import Dataset

from helpers.utils import make_dir_if_not_exists

#
# Constants
#

opensea_url = "https://api.opensea.io/api/v1/assets"
n_fetch = 100

#


dataset = Dataset()


def fetch_assets(params, opensea_url: str = opensea_url):
    res = requests.get(opensea_url, params)
    try:
        json = res.json()
        return json['assets']
    except:
        return None


def to_fetch(n, fulfilled, target):
    return n - ((target - fulfilled) % n)


if __name__ == '__main__':
    target_per_collection = dataset.target_image_per_collection()
    make_dir_if_not_exists(dataset.save_dir())

    for collection in dataset.all_collections():
        fulfilled = 0
        offset = 0

        while fulfilled < target_per_collection:
            n = to_fetch(n_fetch, fulfilled, target_per_collection)
            assets = fetch_assets(
                {
                    'collection': collection,
                    'order_by': 'sale_price',
                    'order_direction': 'desc',
                    'offset': offset,
                    'limit': n
                }
            )
            if assets is None:
                continue

            offset += n

            collection_dir = f"{dataset.save_dir()}/{collection}"
            make_dir_if_not_exists(collection_dir)

            for asset in assets:
                image_url = asset['image_url']

                content = requests.get(image_url).content
                ext = filetype.guess_extension(content)

                if ext not in dataset.allowed_extensions():
                    continue

                file_path = f"{collection_dir}/{asset['token_id']}.{ext}"
                with open(file_path, 'wb') as f:
                    f.write(content)

                fulfilled += 1
