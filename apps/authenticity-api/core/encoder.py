from tensorflow.keras.models import load_model
from tensorflow.keras import Model
from tensorflow.keras import layers
import requests
from zipfile import ZipFile
import os

MODEL_PATH = './model'
MODEL_ZIPPED_FILE_PATH = './model.zip'
MODEL_URL = 'https://drive.google.com/u/0/uc?id=1-iMxqa019ST5_sApayrS42cS6ulRvIrs&export=download&confirm=t'

def is_downloaded():
    return os.path.isdir(MODEL_PATH)
    

def download_model():
    print("Downloading... ", end='')
    response = requests.get(MODEL_URL)
    with open(MODEL_ZIPPED_FILE_PATH, "wb") as f:
        f.write(response.content)
    print("[Done]")
    
    print("Extracting... ", end='')
    with ZipFile(MODEL_ZIPPED_FILE_PATH, 'r') as f:
        f.extractall()
    print("[Done]")


def get_encoder(model):
    return model.get_layer('encoder')


def build_classifier(model):
    input_a = layers.Input(shape=(128))
    input_b = layers.Input(shape=(128))
    out = model.get_layer('distance')(input_a, input_b)
    out = model.get_layer('classificator')(out)
    result = Model(inputs=[input_a, input_b], outputs=out)
    result.compile()
    return result


def get_model():
    if not is_downloaded():
        download_model()

    print("Loading Model... ", end='')
    model = load_model(MODEL_PATH)
    print("[Done]")

    return get_encoder(model), build_classifier(model)