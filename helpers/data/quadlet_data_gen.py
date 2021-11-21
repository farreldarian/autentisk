import math
import tensorflow as tf
import numpy as np

from helpers.quadlet import generate_quadlet
from helpers.dataset import Dataset


class QuadletDataGen(tf.keras.utils.Sequence):
    def __init__(self, dataset=Dataset(), batch_size=64) -> None:
        self.dataset: Dataset = dataset
        self.batch_size: int = batch_size

    def __len__(self) -> int:
        return math.ceil(len(self.dataset.all_images()) / self.batch_size)

    def __getitem__(self, idx) -> np.ndarray:
        start = idx * self.batch_size
        end = (idx + 1) * self.batch_size

        batch_x = [
            generate_quadlet(nft.collection, nft.image_name)
            for nft in self.dataset.nfts[start:end]
        ]

        # Not used
        batch_y = [[0]] * len(batch_x)

        return np.array(batch_x), np.array(batch_y)
