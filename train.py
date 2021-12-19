from helpers.data.quadlet_data_gen import QuadletDataGen
from tensorflow.keras.applications.resnet_v2 import ResNet50V2, preprocess_input
from tensorflow.keras.optimizers import Nadam
import tensorflow.keras as keras
import tensorflow as tf
import tensorflow.keras.backend as K

from helpers.neural_network.loss import loss_tensor


def build_model() -> keras.Model:
    inputs = tf.keras.Input(shape=(224, 224, 3))
    out: keras.Model = ResNet50V2(include_top=False)(inputs)
    return tf.keras.Model(inputs=inputs, outputs=out)


model: keras.Model = build_model()

train_gen: QuadletDataGen = QuadletDataGen(preprocess_func=preprocess_input)
model.compile(loss=loss_tensor, optimizer=Nadam())
model.fit(train_gen, epochs=10)
