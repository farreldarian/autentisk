import math
from typing import Dict, Tuple
from PIL import Image
import tensorflow as tf
import numpy as np
import augly.image as imaugs
import random
from sklearn.preprocessing import LabelEncoder


from helpers.dataset import Data, Dataset

PILQuadlet = Tuple[Image.Image, Image.Image, Image.Image, Image.Image]
Quadlet = Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]


class QuadletDataGen(tf.keras.utils.Sequence):

    def __init__(self, dataset=Dataset(), batch_size=64, preprocess_func=None, target_size=(224, 224), label_encoder: LabelEncoder = None) -> None:
        self.augment_functions = [imaugs.meme_format, imaugs.overlay_text]
        self.cache: Dict[str, Image.Image] = {}

        self.dataset: Dataset = dataset
        self.label_encoder: LabelEncoder = LabelEncoder().fit(
            self.dataset.get_collections())
        self.batch_size: int = batch_size
        self.preprocess_func = preprocess_func
        self.target_size: Tuple[int, int] = target_size

    def __len__(self) -> int:
        return math.ceil(self.dataset.get_total_images() / self.batch_size)

    def __getitem__(self, idx) -> np.ndarray:
        start = idx * self.batch_size
        end = (idx + 1) * self.batch_size

        batch_x = []
        batch_y = []
        for data in self.dataset.data[start:end]:
            batch_x += self.__preprocess(self.__generate_quadlet(data))
            batch_y.append(data.collection)

        return np.array(batch_x), self.label_encoder.transform(batch_y).reshape([None, 1])

    def getitem(self, idx):
        return self.__getitem__(idx)

    def __preprocess(self, quadlet: PILQuadlet) -> Quadlet:
        if self.preprocess_func is None:
            return quadlet
        return [self.preprocess_func(image) for image in quadlet]

    def __generate_quadlet(self, data: Data) -> Quadlet:
        anchor = self.__load_image(data)
        positive = self.__augment(anchor.copy())
        intermediate = self.__get_intermediate_image(data)
        negative = self.__get_negative_image(data.collection)

        return [np.array(anchor), np.array(positive), np.array(intermediate), np.array(negative)]

    def __get_intermediate_image(self, anchor_data: Data) -> Image.Image:
        image_file = random.choice(self.dataset.get_image_files(anchor_data.collection, [
            anchor_data.image_file]))
        return self.__load_image(Data(anchor_data.collection, image_file))

    def __get_negative_image(self, anchor_collection: str) -> Image.Image:
        collection = random.choice(self.dataset.get_collections([
            anchor_collection]))
        image_file = random.choice(self.dataset.get_image_files(collection))

        return self.__load_image(Data(collection, image_file))

    def __load_image(self, data: Data) -> Image.Image:
        key = data.collection + "-" + data.image_file
        if key in self.cache:
            return self.cache[key]

        image_path = self.dataset.resolve_image_path(
            data.collection, data.image_file)
        self.cache[key] = Image.open(image_path).convert(
            'RGB').resize(self.target_size)
        return self.cache[key]

    def __augment(self, pil_image: Image.Image) -> Image.Image:
        augment = random.choice(self.augment_functions)
        return augment(pil_image).resize(self.target_size)
