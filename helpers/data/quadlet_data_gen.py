import math
from typing import Dict, Tuple
from PIL import Image
import tensorflow as tf
import numpy as np
import random
from sklearn.preprocessing import LabelEncoder
from helpers.augly import augly_augment
from tensorflow.keras.preprocessing.image import ImageDataGenerator


from helpers.dataset import Data, Dataset


class QuadletDataGen(tf.keras.utils.Sequence):

    def __init__(self, dataset=Dataset(), batch_size=64, preprocess_func=None, target_size=(224, 224), label_encoder: LabelEncoder = None) -> None:
        self.cache = {}

        self.dataset: Dataset = dataset
        self.label_encoder: LabelEncoder = LabelEncoder().fit(
            self.dataset.get_collections())
        self.batch_size: int = batch_size
        self.preprocess_func = preprocess_func
        self.target_size: Tuple[int, int] = target_size
        self.image_datagen = ImageDataGenerator(
            rotation_range=20,
            horizontal_flip=True,
            vertical_flip=True,
            brightness_range=(0.9, 1.1)
        )

    def __len__(self) -> int:
        return math.ceil(self.dataset.get_total_images() / self.batch_size)

    def __getitem__(self, idx) -> Tuple[np.ndarray, np.ndarray]:
        start = idx * self.batch_size
        end = (idx + 1) * self.batch_size

        batch_x = []
        batch_y = []
        for data in self.dataset.data[start:end]:
            batch_x += self.__preprocess(self.__generate_quadlet(data))
            batch_y.append(data.collection)

        return batch_x, self.label_encoder.transform(batch_y).reshape([self.batch_size, 1])

    def getitem(self, idx):
        return self.__getitem__(idx)

    def preview_quadlet(self):
        data = random.sample(self.dataset.data, 1)[0]
        return self.__generate_quadlet(data)

    def __preprocess(self, quadlet):
        if self.preprocess_func is None:
            return quadlet
        return [self.preprocess_func(image) for image in quadlet]

    def __generate_quadlet(self, data: Data):
        anchor = self.__load_image(data)
        positive = self.__augly_augment(anchor.copy())
        intermediate = self.__get_intermediate_image(data)
        negative = self.__get_negative_image(data.collection)

        return [anchor, positive, intermediate, negative]

    def __get_intermediate_image(self, anchor_data: Data) -> np.ndarray:
        image_file = random.choice(self.dataset.get_image_files(anchor_data.collection, [
            anchor_data.image_file]))
        return self.__load_image(Data(anchor_data.collection, image_file))

    def __get_negative_image(self, anchor_collection: str) -> np.ndarray:
        collection = random.choice(self.dataset.get_collections([
            anchor_collection]))
        image_file = random.choice(self.dataset.get_image_files(collection))

        return self.__load_image(Data(collection, image_file))

    def __load_image(self, data: Data) -> np.ndarray:
        key = data.collection + "-" + data.image_file

        if key not in self.cache:
            image_path = self.dataset.resolve_image_path(
                data.collection, data.image_file)
            self.cache[key] = np.array(Image.open(
                image_path).convert("RGB").resize(self.target_size))

        return self.image_datagen.random_transform(self.cache[key])

    def __augly_augment(self, image: np.ndarray) -> np.ndarray:
        pil_augmented = augly_augment(
            tf.keras.utils.array_to_img(image)).resize(self.target_size)
        return np.array(pil_augmented)
