import os
from typing import Dict, List
import random
from numpy import DataSource
import yaml
from pathlib import Path
from tqdm import tqdm

from .utils import listdir


ROOT_PATH = Path(__file__).parent.resolve().parent.resolve()
CONFIG_PATH = str(ROOT_PATH / "configs" / "dataset.yml")


class Data:
    def __init__(self, collection: str, image_file: str):
        self.collection: str = collection
        self.image_file: str = image_file


class Dataset:
    data: List[Data] = []
    collection_image_files: Dict[str, List[str]] = {}
    total_images: int = 0

    def __init__(self, dataset_path: str = None):
        self.yaml_config: Dict = self.load_config(CONFIG_PATH)

        if dataset_path is None:
            self.dataset_path: Path = ROOT_PATH / self.yaml_config['save_dir']
        else:
            self.dataset_path: Path = Path(dataset_path)

        print(f"Reading dataset from {self.dataset_path}")
        for collection in listdir(self.dataset_path):
            self.collection_image_files[collection] = []
            collection_arr: List[str] = self.collection_image_files[collection]

            for file in tqdm(listdir(self.dataset_path / collection), desc=collection):
                collection_arr.append(file)
                self.data.append(Data(collection, file))

        random.shuffle(self.data)
        print(
            f"Fetched {len(self.data)} images from {len(self.collection_image_files.keys())} collections")

    @ staticmethod
    def load_config(path: str):
        if not os.path.isfile(path):
            raise Exception(f"Can't locate config path in {path}")

        with open(path) as f:
            return yaml.load(f, Loader=yaml.FullLoader)

    def get_total_images(self) -> int:
        return len(self.data)

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
