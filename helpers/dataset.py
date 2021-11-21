import os
import yaml
import numpy as np
from pathlib import Path
from PIL import Image
from .utils import listdir

HELPERS_FOLDER = Path(__file__).parent
CONFIG_PATH = HELPERS_FOLDER.joinpath('../configs/dataset.yml')


class Dataset:
    def __init__(self, path=CONFIG_PATH):
        self.yaml_config = self.__load_config(path)

    @staticmethod
    def resolve_collection_path(collection: str):
        return f'dataset/{collection}'

    @staticmethod
    def resolve_image_path(collection: str, image_file: str):
        return f'{Dataset.resolve_collection_path(collection)}/{image_file}'

    def categories(self, ignores=None):
        categories = list(self.yaml_config['collections_per_category'].keys())
        if ignores is not None:
            categories = [
                category for category in categories if category not in ignores]
        return categories

    def collections(self, category: str):
        return list(self.yaml_config['collections_per_category'][category])

    def all_images(self):
        images = []
        for collection in self.all_collections():
            images += self.collection_images(collection)
        return images

    def all_collections(self):
        collections = []
        for category in self.categories():
            collections += self.collections(category)

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
        image = image.resize(target_size)
        np_image = np.array(image)
        return np_image[:, :, :3] if np_image.shape[-1] > 3 else np_image

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
