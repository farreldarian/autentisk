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

TARGET_PER_COLLECTION = config['target']['image_per_collection']
SAVE_DIR = config['save_dir']
COLLECTIONS_PER_CATEGORY = config['collections_per_category']
ALLOWED_EXTENSIONS = config['allowed_extensions']

#


def fetch_assets(collection_name: str, api_offset: int, limit: int, opensea_url: str = opensea_url):
    res = requests.get(opensea_url,
                       {
                           'collection': collection_name,
                           'order_by': 'pk',
                           'order_direction': 'asc',
                           'offset': api_offset,
                           'limit': limit
                       }
                       )
    json = res.json()
    return json['assets']


def calc_to_fetch(n, fulfilled, target):
    remaining = target - fulfilled
    if remaining > n:
        return n
    return remaining


def get_collections() -> List[str]:
    collections: List[str] = []
    for category in COLLECTIONS_PER_CATEGORY:
        collections += COLLECTIONS_PER_CATEGORY[category]
    return collections


def resolve_collection_dir(collection_name: str):
    return f"{SAVE_DIR}/{collection_name}"


def resolve_image_path(collection_name: str, image_file: str):
    return f"{resolve_collection_dir(collection_name)}/{image_file}"


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


def handle_asset(collection_name: str, asset: Dict):
    image_url: str = asset['image_url']
    token_id: str = asset['token_id']
    allowed_extensions: List[str] = ALLOWED_EXTENSIONS + \
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
        message = f"{ext} isn't allowed, only accept {ALLOWED_EXTENSIONS}"
        print(message)
        raise InvalidFileType(message)

    file_path = resolve_image_path(collection_name, f"{token_id}.{ext}")

    if isfile(file_path):
        raise FileAlreadyExists('Image already exists')

    with open(file_path, 'wb') as f:
        f.write(content)


def get_number_of_files(dir: str):
    return len(listdir(dir))


if __name__ == '__main__':
    make_dir_if_not_exists(SAVE_DIR)

    print('Fetching images...')
    for collection in get_collections():
        collection_dir = resolve_collection_dir(collection)
        make_dir_if_not_exists(collection_dir)

        n_stored = get_number_of_files(collection_dir)
        pbar = tqdm(initial=n_stored,
                    total=TARGET_PER_COLLECTION,
                    desc=collection)

        api_offset = 0
        while n_stored < TARGET_PER_COLLECTION:
            n_to_fetch = calc_to_fetch(
                n_fetch, n_stored, TARGET_PER_COLLECTION)
            assets = fetch_assets(collection, api_offset, n_to_fetch)

            api_offset += n_to_fetch

            for asset in assets:
                try:
                    handle_asset(collection, asset)
                except:
                    continue

                n_stored += 1
                pbar.update(1)

        pbar.close()
