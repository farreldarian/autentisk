import math
from typing import List
import tensorflow as tf
import numpy as np
from helpers.data.nft import NFT

from helpers.quadlet import generate_quadlet
from helpers.dataset import Dataset


class QuadletDataGen(tf.keras.utils.Sequence):
    def __init__(self, dataset=Dataset(), batch_size=64, preprocess_func=None) -> None:
        self.dataset: Dataset = dataset
        self.batch_size: int = batch_size
        self.preprocess_func = preprocess_func

    def __len__(self) -> int:
        return math.ceil(len(self.dataset.all_images()) / self.batch_size)

    def __getitem__(self, idx) -> np.ndarray:
        start = idx * self.batch_size
        end = (idx + 1) * self.batch_size

        batch_x = []
        for nft in self.dataset.nfts[start:end]:
            batch_x += self.__generate_quadlet(nft)

        batch_x = self.__preprocess(batch_x)

        # Not used
        batch_y = [[0]] * len(batch_x)

        return np.array(batch_x), np.array(batch_y)

    def __preprocess(self, images: List[List[np.ndarray]]) -> List[List[np.ndarray]]:
        if self.preprocess_func is None:
            return images

        for i in range(len(images)):
            images[i] = [self.preprocess_func(img) for img in images[i]]
        return images

    def __generate_quadlet(self, nft: NFT):
        return generate_quadlet(nft.collection, nft.image_name)
