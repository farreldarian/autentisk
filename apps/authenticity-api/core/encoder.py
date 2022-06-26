from tensorflow.keras.models import load_model

ENCODER_PATH = './model'


def get_model():
    return load_model(ENCODER_PATH)