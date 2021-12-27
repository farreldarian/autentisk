import os
from typing import Dict, List, Optional
import random
import yaml
import numpy as np
from pathlib import Path
from PIL import Image
import tensorflow as tf
from tqdm import tqdm

from helpers.data.nft import NFT
from .utils import listdir


ROOT_PATH = Path(__file__).parent.resolve().parent.resolve()
CONFIG_PATH = str(ROOT_PATH / "configs" / "dataset.yml")


class Dataset:
    nfts: List[NFT] = []
    collection_image_files: Dict[str, List[str]]
    images: Dict[str, Optional[np.ndarray]]
    total_collections: int = 0
    total_images: int = 0

    def __init__(self, path=CONFIG_PATH):
        self.yaml_config: Dict = self.load_config(path)
        self.dataset_path: Path = ROOT_PATH / self.yaml_config['save_dir']

        print(f"Reading dataset from {self.dataset_path}")
        for collection in listdir(self.dataset_path):
            self.collection_image_files[collection] = []
            collection_arr: List[str] = self.collection_image_files[collection]

            for file in tqdm(listdir(self.dataset_path / collection), desc=collection):
                collection_arr.append(file)
                self.total_images += 1

            random.shuffle(collection_arr)
            self.total_collection += 1

        print(
            f"Fetched {self.total_images} images from {self.total_collections} collections")

        # for category in self.categories():
        #     for column in self.collections(category):
        #         for image_name in self.collection_images(column):
        #             self.nfts.append(NFT(image_name, column, category))

    @ staticmethod
    def resolve_collection_path(collection: str):
        """
        Resolves collection folder path relative to project's root folder.

        Parameters
        ----------
        collection : str
            collection name
        """
        return f'dataset/{collection}'

    @ staticmethod
    def load_config(path: str):
        if not os.path.isfile(path):
            raise Exception(f"Can't locate config path in {path}")

        with open(path) as f:
            return yaml.load(f, Loader=yaml.FullLoader)

    def resolve_image_path(self, collection: str, image_file: str) -> Path:
        return self.dataset_path / collection / image_file

    def get_collections(self, ignores: List[str] = None) -> List[str]:
        collections = list(self.collection_image_files.keys())
        if ignores is None:
            return collections
        return [col for col in collections if col not in ignores]

    def get_image_files(self, collection: str, ignores: List[str] = None):
        image_files = self.collection_image_files[collection]
        if ignores is None:
            return image_files
        return [file for file in image_files if file not in ignores]

    def load_image(self, collection: str, image_file: str, target_size=(224, 224)):
        key = self.image_key = self.make_image_key(collection, image_file)
        if self.images.has_key(key):
            return self.images[key]

        self.images[key] = np.array(
            Image.open(self.resolve_image_path(collection, image_file))
            .convert('RGB')
            .resize(target_size)
        )
        return self.images[key]

    def make_image_key(self, collection: str, image: str):
        return collection + '-' + image
