import numpy as np
from tensorflow.python.framework.ops import Tensor
import tensorflow.keras.backend as K


def euclidian_distance(x, y):
    return np.sqrt(np.sum((y - x)**2))


def euclidian_distance_tensor(x: Tensor, y: Tensor) -> Tensor:
    return K.sqrt(K.sum((x - y)**2))
