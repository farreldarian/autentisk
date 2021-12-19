import tensorflow.keras.backend as K
import tensorflow as tf
from tensorflow.python.framework.ops import Tensor
import numpy as np

from helpers.distance import euclidian_distance, euclidian_distance_tensor

N_SAMPLE: int = 4
G1 = 0.7
G2 = 0.3
G3 = 0.5
G1_TENSOR: Tensor = tf.constant(G1, shape=[1], dtype=tf.float32)
G2_TENSOR: Tensor = tf.constant(G2, shape=[1], dtype=tf.float32)
G3_TENSOR: Tensor = tf.constant(G3, shape=[1], dtype=tf.float32)

EPSILON: float = K.epsilon()
ZERO_TENSOR = tf.constant(0.0, shape=[1], dtype=tf.float32)


def loss(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    loss1, loss2, loss3 = 0, 0, 0
    length = y_true.shape[0]

    for i_ in range(0, length, N_SAMPLE):
        # Do we need a try catch here?
        # try:
        q = y_pred[i_+0]
        p = y_pred[i_+1]
        i = y_pred[i_+2]
        n = y_pred[i_+3]

        distance_q_p = euclidian_distance(q, p)
        distance_q_n = euclidian_distance(q, n)
        distance_q_i = euclidian_distance(q, i)
        distance_p_i = euclidian_distance(p, i)
        distance_p_n = euclidian_distance(p, n)

        loss1 = (loss1 + G1 + distance_q_p - distance_q_n)
        loss2 = (loss2 + G2 + distance_q_p - distance_q_i)
        loss3 = (loss3 + G3 + distance_p_i - distance_p_n)
        # except:
        #     continue

    loss1 = loss1/(length/N_SAMPLE)
    loss2 = loss2/(length/N_SAMPLE)
    loss3 = loss3/(length/N_SAMPLE)

    return np.max(loss1, 0) + np.max(loss2, 0) + np.max(loss3, 0)


def loss_tensor(y_true: Tensor, y_pred: Tensor) -> Tensor:
    y_pred = K.clip(y_pred, EPSILON, 1.0-EPSILON)

    length = y_true.shape[0]

    loss1: Tensor = tf.convert_to_tensor(0, dtype=tf.float32)
    loss2: Tensor = tf.convert_to_tensor(0, dtype=tf.float32)
    loss3: Tensor = tf.convert_to_tensor(0, dtype=tf.float32)

    for i_ in range(0, length, N_SAMPLE):
        # Do we need a try catch here?
        # try:
        q: Tensor = y_pred[i_+0]
        p: Tensor = y_pred[i_+1]
        i: Tensor = y_pred[i_+2]
        n: Tensor = y_pred[i_+3]

        distance_q_p: Tensor = euclidian_distance_tensor(q, p)
        distance_q_n: Tensor = euclidian_distance_tensor(q, n)
        distance_q_i: Tensor = euclidian_distance_tensor(q, i)
        distance_p_i: Tensor = euclidian_distance_tensor(p, i)
        distance_p_n: Tensor = euclidian_distance_tensor(p, n)

        loss1 = (loss1 + G1_TENSOR + distance_q_p - distance_q_n)
        loss2 = (loss2 + G2_TENSOR + distance_q_p - distance_q_i)
        loss3 = (loss3 + G3_TENSOR + distance_p_i - distance_p_n)
        # except:
        #     continue

    loss1 = loss1/(length/N_SAMPLE)
    loss2 = loss2/(length/N_SAMPLE)
    loss3 = loss3/(length/N_SAMPLE)

    return tf.maximum(loss1, ZERO_TENSOR) + tf.maximum(loss2, ZERO_TENSOR) + tf.maximum(loss3, ZERO_TENSOR)
