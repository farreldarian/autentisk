from tensorflow.keras.models import load_model

ENCODER_PATH = './model/encoder'


def get_encoder():
    return load_model(ENCODER_PATH)