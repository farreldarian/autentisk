import math
from typing import Dict, List, Tuple
from PIL import Image
import tensorflow as tf
import numpy as np
import random
from sklearn.preprocessing import LabelEncoder
from helpers.augly import augly_augment
from tensorflow.keras.preprocessing.image import ImageDataGenerator


from helpers.dataset import Data, Dataset

NpQuadlet = Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]


class QuadletDataGen(tf.keras.utils.Sequence):

    def __init__(self,
                 batch_size: int = 64,
                 dataset: Dataset = Dataset(),
                 preprocess_func=None,
                 target_size: Tuple[int, int] = (224, 224),
                 label_encoder: LabelEncoder = None) -> None:

        self.dataset: Dataset = dataset
        self.batch_size: int = batch_size
        self.preprocess_func = preprocess_func
        self.target_size: Tuple[int, int] = target_size

        if label_encoder:
            self.label_encoder: LabelEncoder = label_encoder
        else:
            self.label_encoder: LabelEncoder = LabelEncoder().fit(
                self.dataset.get_collections()
            )

        self.image_datagen: ImageDataGenerator = ImageDataGenerator(
            rotation_range=20,
            horizontal_flip=True,
            vertical_flip=True,
            brightness_range=(0.9, 1.1)
        )
        self.cache: Dict[str, np.ndarray] = {}

    def __len__(self) -> int:
        return math.ceil(self.dataset.get_total_images() / self.batch_size)

    def __getitem__(self, idx: int) -> Tuple[List[NpQuadlet], np.ndarray]:
        start: int = idx * self.batch_size
        end: int = (idx + 1) * self.batch_size

        batch_x: List[NpQuadlet] = []
        batch_y: List[str] = []
        for data in self.dataset.data[start:end]:
            batch_x += self.__preprocess(self.__generate_quadlet(data))
            batch_y.append(data.collection)

        encoded_batch_y: np.ndarray = self.label_encoder.transform(
            batch_y
        ).reshape([self.batch_size, 1])
        return batch_x, encoded_batch_y

    def getitem(self, idx) -> Tuple[List[NpQuadlet], np.ndarray]:
        return self.__getitem__(idx)

    def preview_quadlet(self) -> NpQuadlet:
        data: Data = random.sample(self.dataset.data, 1)[0]
        return self.__generate_quadlet(data)

    def __preprocess(self, quadlet: NpQuadlet) -> NpQuadlet:
        if self.preprocess_func is None:
            return quadlet
        return [self.preprocess_func(image) for image in quadlet]

    def __generate_quadlet(self, data: Data) -> NpQuadlet:
        anchor: np.ndarray = self.__load_image(data)
        positive: np.ndarray = self.__augly_augment(anchor.copy())
        intermediate: np.ndarray = self.__get_intermediate_image(data)
        negative: np.ndarray = self.__get_negative_image(data.collection)

        return [anchor, positive, intermediate, negative]

    def __get_intermediate_image(self, anchor_data: Data) -> np.ndarray:
        collection_images: List[str] = self.dataset.get_image_files(
            anchor_data.collection, [anchor_data.image_file]
        )
        image_file: str = random.choice(collection_images)
        return self.__load_image(Data(anchor_data.collection, image_file))

    def __get_negative_image(self, anchor_collection: str) -> np.ndarray:
        alt_collections: List[str] = self.dataset.get_collections(
            [anchor_collection]
        )
        collection: str = random.choice(alt_collections)
        image_file: str = random.choice(
            self.dataset.get_image_files(collection)
        )

        return self.__load_image(Data(collection, image_file))

    def __load_image(self, data: Data) -> np.ndarray:
        key: str = data.collection + "-" + data.image_file

        if key not in self.cache:
            image_path: str = self.dataset.resolve_image_path(
                data.collection, data.image_file)
            image: Image = Image.open(image_path)
            image = image.convert("RGB").resize(self.target_size)
            self.cache[key] = np.array(image)

        return self.image_datagen.random_transform(self.cache[key])

    def __augly_augment(self, image: np.ndarray) -> np.ndarray:
        pil_augmented: Image = augly_augment(
            tf.keras.utils.array_to_img(image)
        ).resize(self.target_size)
        return np.array(pil_augmented)
