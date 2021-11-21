import math
import tensorflow as tf
from ..dataset import Dataset


class QuadletDataGen(tf.keras.utils.Sequence):
    def __init__(self, dataset=Dataset(), batch_size=64):
        self.dataset = dataset
        self.batch_size = batch_size

    def __len__(self):
        return math.ceil(len(self.dataset.all_images()) / self.batch_size)
