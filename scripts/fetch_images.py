import io
import os
from pathlib import Path
from typing import Dict, List, Optional
import requests
import filetype
from tqdm import tqdm
from PIL import Image
import cv2
import hashlib


#
# Constants
#

opensea_url = "https://api.opensea.io/api/v1/assets"
n_fetch = 50

#

TARGET_PER_COLLECTION = 2500 
SAVE_DIR = "./dataset"
COLLECTIONS_PER_CATEGORY = {
    "pfp": [
        'cryptopunks',
    'incognito-nft',
    'boredapeyachtclub',
    'pudgypenguins',
    'clonex',
    'doodles-official',
    'mutant-ape-yacht-club',
    'mypethooligan',
    'slotienft',
    'projectnanopass',
    'cyberkongz',
    'collectvox',
    'croakz-v2-1',
    'cool-cats-nft',
    'cryptoadz-by-gremplin',
    'lazy-lions',
    'the-doge-pound',
    'lostpoets',
    'sappy-seals',
    'noodlesnft-official',
    ]
}
VIDEO_EXTENSIONS = ["mp4", "gif"]
ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg"] + VIDEO_EXTENSIONS

#

def listdir(path: str, ignores=['.DS_Store']):
    items = os.listdir(path)
    return [item for item in items if item not in ignores]

def get_file_hash(file_path, buffer_size=65536):
    hash_func = hashlib.sha256()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(buffer_size)
            if not data:
                break
            hash_func.update(data)
    return hash_func.hexdigest()

def make_dir_if_not_exists(path: str):
    if os.path.isdir(path):
        return

    os.makedirs(path)

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


def save_image_from_bytes(file_path: Path, content: bytes):
    image = Image.open(io.BytesIO(content)).convert("RGB")
    image.save(file_path, "JPEG")


def get_number_of_files(dir: str):
    return len(listdir(dir))


def main():
    make_dir_if_not_exists(SAVE_DIR)

    print('Fetching images...')
    for collection in get_collections():
        image_hashes = []

        collection_dir = SAVE_DIR / collection
        make_dir_if_not_exists(collection_dir)

        n_stored = 0
        pbar = tqdm(total=TARGET_PER_COLLECTION, desc=collection)

        for token_file in listdir(SAVE_DIR / collection):
            image_hashes.append(get_file_hash(
                SAVE_DIR / collection / token_file))
            n_stored += 1
            pbar.update(1)

        api_offset = 0
        while n_stored < TARGET_PER_COLLECTION:
            n_to_fetch = calc_to_fetch(
                n_fetch, n_stored, TARGET_PER_COLLECTION)
            assets = fetch_assets(collection, api_offset, n_to_fetch)

            api_offset += n_to_fetch

            for asset in assets:
                image_url: str = asset['image_url']
                token_id: str = asset['token_id']
                file_path: Path = SAVE_DIR / \
                    collection / f"{token_id}.jpeg"

                if file_path.is_file():
                    continue

                ext: Optional[str] = naively_get_extension(
                    asset['image_original_url']
                )
                if ext is not None and ext in VIDEO_EXTENSIONS:
                    save_image_from_video_url(image_url, file_path)
                else:
                    content: bytes = requests.get(image_url).content
                    ext = filetype.guess_extension(content)

                    if ext is None:
                        continue
                    elif ext not in ALLOWED_EXTENSIONS:
                        continue
                    elif ext in VIDEO_EXTENSIONS:
                        save_image_from_video_url(image_url, file_path)
                    else:
                        save_image_from_bytes(file_path, content)

                hash = get_file_hash(file_path)
                if hash in image_hashes:
                    os.remove(file_path)
                    continue
                else:
                    image_hashes.append(hash)

                n_stored += 1
                pbar.update(1)

        pbar.close()


if __name__ == '__main__':
    main()
