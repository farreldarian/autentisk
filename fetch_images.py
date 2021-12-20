from genericpath import isfile
from typing import Any, Dict, List
from filetype.types import VIDEO
import requests
import filetype
from tqdm import tqdm
from PIL import Image
from io import BytesIO
import cv2

from helpers.utils import listdir, make_dir_if_not_exists
from helpers.config_loaders import load_dataset_config

#
# Constants
#

opensea_url = "https://api.opensea.io/api/v1/assets"
n_fetch = 50

#

config = load_dataset_config()


def fetch_assets(collection_name: str, api_offset: int, limit: int, opensea_url: str = opensea_url):
    res = requests.get(opensea_url,
                       {
                           'collection': collection_name,
                           'order_by': 'sale_price',
                           'order_direction': 'desc',
                           'offset': api_offset,
                           'limit': limit
                       }
                       )
    try:
        json = res.json()
        return json['assets']
    except:
        return None


def calc_to_fetch(n, fulfilled, target):
    return n - ((target - fulfilled) % n)


def get_collections() -> List[str]:
    collections: List[str] = []
    for category in config['collections_per_category']:
        collections += config['collections_per_category'][category]
    return collections


def resolve_collection_dir(collection_name: str):
    return f"{config['save_dir']}/{collection_name}"


def resolve_image_path(collection_name: str, image_file: str):
    return f"{resolve_collection_dir(collection_name)}/{image_file}"


def is_target_reached(collection_name: str):
    return len(listdir(resolve_collection_dir(collection_name))) >= target_per_collection


class InvalidFileType(ValueError):
    pass


class FileAlreadyExists(Exception):
    pass


def naively_get_extension(image_path: str):
    splits = image_path.split('/')[-1].split('.')[-1]
    if len(splits) < 2:
        return None
    return splits[-1]


VIDEO_EXTENSIONS = ['mp4', 'gif']


def save_image_from_video(video_url: str, image_path: str):
    cap = cv2.VideoCapture(video_url)
    _, image = cap.read()

    cv2.imwrite(image_path, image)

    cap.release()


def handle_image(collection_name: str, asset: Dict):
    image_url: str = asset['image_url']
    token_id: str = asset['token_id']
    allowed_extensions: List[str] = config['allowed_extensions'] + \
        VIDEO_EXTENSIONS

    ext = naively_get_extension(asset['image_original_url'])
    if ext is not None and ext in allowed_extensions:
        file_path = resolve_image_path(collection_name, f"{token_id}.{ext}")
        if isfile(file_path):
            raise FileAlreadyExists('Image already exists')

        if ext in VIDEO_EXTENSIONS:
            save_image_from_video(image_url, resolve_image_path(
                collection_name, f"{token_id}.jpg"))
            return

    content = requests.get(image_url).content
    ext = filetype.guess_extension(content)

    if ext in VIDEO_EXTENSIONS:
        save_image_from_video(image_url, resolve_image_path(
            collection_name, f"{token_id}.jpg"))
        return

    if ext not in allowed_extensions:
        message = f"{ext} isn't allowed, only accept {config['allowed_extensions']}"
        print(message)
        raise InvalidFileType(message)

    file_path = resolve_image_path(collection_name, f"{token_id}.{ext}")

    if isfile(file_path):
        raise FileAlreadyExists('Image already exists')

    with open(file_path, 'wb') as f:
        f.write(content)


if __name__ == '__main__':
    target_per_collection = config['target']['image_per_collection']
    make_dir_if_not_exists(config['save_dir'])

    print('Fetching images...')
    for collection in get_collections():
        if is_target_reached(collection):
            continue

        make_dir_if_not_exists(resolve_collection_dir(collection))

        n_stored = 0
        api_offset = 0
        pbar = tqdm(total=target_per_collection, desc=collection)
        while n_stored < target_per_collection:
            n_to_fetch = calc_to_fetch(
                n_fetch, n_stored, target_per_collection)
            assets = fetch_assets(collection, api_offset, n_to_fetch)
            if assets is None:
                continue

            api_offset += n_to_fetch

            for asset in assets:
                try:
                    handle_image(collection, asset)
                except FileAlreadyExists:
                    pass
                except InvalidFileType:
                    continue
                except:
                    continue

                n_stored += 1
                pbar.update(1)

        pbar.close()
