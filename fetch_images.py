import io
from os.path import isfile
import os
from pathlib import Path
from typing import Any, Dict, List, Optional
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
SAVE_DIR = Path(__file__).parent.resolve().joinpath(config['save_dir'])
COLLECTIONS_PER_CATEGORY = config['collections_per_category']
VIDEO_EXTENSIONS = ["mp4", "gif"]
ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg"] + VIDEO_EXTENSIONS

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


def resolve_collection_dir(collection_name: str) -> Path:
    return SAVE_DIR / collection_name


def resolve_image_path(collection_name: str, image_file: str) -> Path:
    return resolve_collection_dir(collection_name) / image_file


class InvalidFileType(ValueError):
    pass


class FileAlreadyExists(Exception):
    pass


class UnknownExtension(Exception):
    pass


def naively_get_extension(image_path: str):
    splits = image_path.split('/')[-1].split('.')[-1]
    if len(splits) < 2:
        return None
    return splits[-1]


def save_image_from_video_url(video_url: str, image_path: Path):
    cap = cv2.VideoCapture(video_url)
    _, image = cap.read()

    cv2.imwrite(str(image_path), image)

    cap.release()


def file_exists(file_path: Path) -> bool:
    return file_path.is_file()


def asset_is_video(asset: Dict):
    ext = naively_get_extension(asset['image_original_url'])


def save_image_from_bytes(file_path, content):
    image = Image.open(io.BytesIO(content)).convert("RGB")
    image.save(file_path, "JPEG")


def handle_asset(collection_name: str, asset: Dict):
    image_url: str = asset['image_url']
    token_id: str = asset['token_id']
    file_path: Path = resolve_image_path(collection_name, f"{token_id}.jpeg")

    if file_path.is_file():
        raise FileAlreadyExists('Image already exists')

    ext: Optional[str] = naively_get_extension(
        asset['image_original_url']
    )
    if ext is not None and ext in VIDEO_EXTENSIONS:
        save_image_from_video_url(image_url, file_path)
        return

    content = requests.get(image_url).content
    ext = filetype.guess_extension(content)

    if ext is None:
        raise UnknownExtension
    elif ext in VIDEO_EXTENSIONS:
        save_image_from_video_url(image_url, file_path)
        return
    elif ext not in ALLOWED_EXTENSIONS:
        message = f"{ext} isn't allowed, only accepting {ALLOWED_EXTENSIONS}"
        print(message)
        raise InvalidFileType(message)

    save_image_from_bytes(file_path, content)


def get_number_of_files(dir: str):
    return len(listdir(dir))


def main():
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


if __name__ == '__main__':
    main()
