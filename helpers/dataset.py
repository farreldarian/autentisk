import os
from typing import List
import yaml
import numpy as np
from pathlib import Path
from PIL import Image

from helpers.data.nft import NFT
from .utils import listdir

HELPERS_FOLDER = Path(__file__).parent
CONFIG_PATH = HELPERS_FOLDER.joinpath('../configs/dataset.yml')


class Dataset:
    nfts: List[NFT] = []

    def __init__(self, path=CONFIG_PATH):
        self.yaml_config = self.__load_config(path)
        for category in self.categories():
            for column in self.collections(category):
                for image_name in self.collection_images(column):
                    self.nfts.append(NFT(image_name, column, category))

    @staticmethod
    def resolve_collection_path(collection: str):
        """
        Resolves collection folder path relative to project's root folder.

        Parameters
        ----------
        collection : str
            collection name
        """
        return f'dataset/{collection}'

    @staticmethod
    def resolve_image_path(collection: str, image_file: str):
        """
        Resolves image file path relative to project's root folder.

        Collection can be retrieved by using `collections()` or `all_collections()`.

        Parameters
        ----------
        collection : str
            collection name
        image_file : str
            image file name with extension
        """
        return f'{Dataset.resolve_collection_path(collection)}/{image_file}'

    def categories(self, ignores=None):
        categories = list(self.yaml_config['collections_per_category'].keys())
        if ignores is not None:
            categories = [
                category for category in categories if category not in ignores]
        return categories

    def collections(self, category: str, ignores: List[str] = None):
        collections = list(
            self.yaml_config['collections_per_category'][category])
        if ignores is not None:
            collections = [col for col in collections if col not in ignores]
        return collections

    def all_images(self):
        images = []
        for collection in self.all_collections():
            images += self.collection_images(collection)
        return images

    def all_collections(self, ignores: List[str] = None):
        collections = []
        for category in self.categories():
            collections += self.collections(category, ignores)

        return collections

    def collection_category(self, collection: str):
        categories = self.categories()
        for category in categories:
            collections = self.collections(category)
            if collection in collections:
                return category

        return None

    def collection_images(self, collection: str, ignores=None):
        images = listdir(self.resolve_collection_path(collection))
        if ignores is not None:
            images = [image for image in images if image not in ignores]
        return images

    def load_image(self, collection: str, image_file: str, target_size=(224, 224)):
        image_path = self.resolve_image_path(collection, image_file)
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize(target_size)
        return np.array(image)

    def load_nft(self, nft: NFT, target_size=(224, 224)) -> np.ndarray:
        return self.load_image(nft.collection, nft.image_path, target_size)

    def save_dir(self):
        return self.yaml_config['save_dir']

    def allowed_extensions(self):
        return self.yaml_config['allowed_extensions']

    def tarimage_per_collection(self):
        return self.yaml_config['target']['image_per_collection']

    def __load_config(self, path):
        if not os.path.isfile(path):
            raise Exception(f"Can't locate config path in {path}")

        with open(path) as f:
            return yaml.load(f, Loader=yaml.FullLoader)
