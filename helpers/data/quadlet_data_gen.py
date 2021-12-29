import math
from typing import Dict, Tuple
from PIL import Image
import tensorflow as tf
import numpy as np
import random
from sklearn.preprocessing import LabelEncoder
from helpers.augly import augly_augment


from helpers.dataset import Data, Dataset

TensorQuadlet = Tuple[tf.Tensor, tf.Tensor, tf.Tensor, tf.Tensor]


class QuadletDataGen(tf.keras.utils.Sequence):

    def __init__(self, dataset=Dataset(), batch_size=64, preprocess_func=None, target_size=(224, 224), label_encoder: LabelEncoder = None) -> None:
        self.cache: Dict[str, tf.Tensor] = {}

        self.dataset: Dataset = dataset
        self.label_encoder: LabelEncoder = LabelEncoder().fit(
            self.dataset.get_collections())
        self.batch_size: int = batch_size
        self.preprocess_func = preprocess_func
        self.target_size: Tuple[int, int] = target_size

    def __len__(self) -> int:
        return math.ceil(self.dataset.get_total_images() / self.batch_size)

    def __getitem__(self, idx) -> Tuple[tf.Tensor, np.ndarray]:
        start = idx * self.batch_size
        end = (idx + 1) * self.batch_size

        batch_x = []
        batch_y = []
        for data in self.dataset.data[start:end]:
            batch_x += self.__preprocess(self.__generate_quadlet(data))
            batch_y.append(data.collection)

        return np.array(batch_x), self.label_encoder.transform(batch_y).reshape([self.batch_size, 1])

    def getitem(self, idx):
        return self.__getitem__(idx)

    def preview_quadlet(self):
        data = random.sample(self.dataset.data, 1)[0]
        return [np.array(image) for image in self.__generate_quadlet(data)]

    def __preprocess(self, quadlet: TensorQuadlet) -> TensorQuadlet:
        if self.preprocess_func is None:
            return quadlet
        return [self.preprocess_func(image) for image in quadlet]

    def __generate_quadlet(self, data: Data) -> TensorQuadlet:
        anchor = self.__load_image(data)
        positive = self.__augment(tf.identity(anchor))
        intermediate = self.__get_intermediate_image(data)
        negative = self.__get_negative_image(data.collection)

        return [anchor, positive, intermediate, negative]

    def __get_intermediate_image(self, anchor_data: Data) -> tf.Tensor:
        image_file = random.choice(self.dataset.get_image_files(anchor_data.collection, [
            anchor_data.image_file]))
        return self.__load_image(Data(anchor_data.collection, image_file))

    def __get_negative_image(self, anchor_collection: str) -> tf.Tensor:
        collection = random.choice(self.dataset.get_collections([
            anchor_collection]))
        image_file = random.choice(self.dataset.get_image_files(collection))

        return self.__load_image(Data(collection, image_file))

    def __load_image(self, data: Data) -> tf.Tensor:
        key = data.collection + "-" + data.image_file
        if key in self.cache:
            return self.cache[key]

        image_path = self.dataset.resolve_image_path(
            data.collection, data.image_file)
        image_string = tf.io.read_file(str(image_path))
        image = tf.image.decode_jpeg(image_string, channels=3)
        image = tf.image.convert_image_dtype(image, tf.float32)
        image = tf.image.resize(image, self.target_size)
        self.cache[key] = image
        return image

    def __augment(self, image: tf.Tensor) -> tf.Tensor:
        pil_image = tf.keras.utils.array_to_img(image)
        pil_augmented = augly_augment(pil_image)
        return tf.convert_to_tensor(tf.keras.utils.img_to_array(pil_augmented))
