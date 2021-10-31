import os
import yaml
import requests
import filetype

from helpers.utils import make_dir_if_not_exists

#
# Constants
#

dataset_config_path = '../configs/dataset.yml'
opensea_url = "https://api.opensea.io/api/v1/assets"
n_fetch = 5

#


def load_config(config_path):
    if not os.path.isfile(config_path):
        raise Exception(f"Can't locate config path in {config_path}")

    with open(config_path) as f:
        return yaml.load(f, Loader=yaml.FullLoader)


config = load_config(os.path.join(
    os.path.dirname(__file__), dataset_config_path))


def fetch_assets(params, opensea_url: str = opensea_url):
    res = requests.get(opensea_url, params)
    json = res.json()
    return json['assets']


def to_fetch(n, fulfilled, target):
    return n - ((target - fulfilled) % n)


if __name__ == '__main__':
    target_per_collection = config['target']['image_per_collection']
    make_dir_if_not_exists(config['save_dir'])

    for collection in config['collections']:
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
            offset += n

            collection_dir = f"{config['save_dir']}/{collection}"
            make_dir_if_not_exists(collection_dir)

            for asset in assets:
                image_url = asset['image_url']

                content = requests.get(image_url).content
                ext = filetype.guess_extension(content)

                if ext not in config['allowed_extensions']:
                    continue

                file_path = f"{collection_dir}/{asset['token_id']}.{ext}"
                with open(file_path, 'wb') as f:
                    f.write(content)

                fulfilled += 1
