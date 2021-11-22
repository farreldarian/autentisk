from helpers.data.quadlet_data_gen import QuadletDataGen
from tensorflow.keras.applications.resnet_v2 import ResNet50V2, preprocess_input
from tensorflow.keras.optimizers import Nadam
import tensorflow.keras as keras
import tensorflow as tf
import tensorflow.keras.backend as K

_EPSILON = K.epsilon()


def _loss_tensor(y_true, y_pred, batch_size=64):
    y_pred = K.clip(y_pred, _EPSILON, 1.0-_EPSILON)
    loss = tf.convert_to_tensor(0, dtype=tf.float32)
    g = tf.constant(1.0, shape=[1], dtype=tf.float32)
    for i in range(0, batch_size, 4):
        try:
            q_embedding = y_pred[i+0]
            p_embedding = y_pred[i+1]
            n_embedding = y_pred[i+2]
            D_q_p = K.sqrt(K.sum((q_embedding - p_embedding)**2))
            D_q_n = K.sqrt(K.sum((q_embedding - n_embedding)**2))
            loss = (loss + g + D_q_p - D_q_n)
        except:
            continue
    loss = loss/(batch_size/3)
    zero = tf.constant(0.0, shape=[1], dtype=tf.float32)
    return tf.maximum(loss, zero)


def build_model() -> keras.Model:
    inputs = tf.keras.Input(shape=(224, 224, 3))
    out: keras.Model = ResNet50V2(include_top=False)(inputs)
    return tf.keras.Model(inputs=inputs, outputs=out)


model: keras.Model = build_model()

train_gen: QuadletDataGen = QuadletDataGen(preprocess_func=preprocess_input)
model.compile(loss=_loss_tensor, optimizer=Nadam())
model.fit(train_gen, epochs=10)
