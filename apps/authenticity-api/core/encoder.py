from tensorflow.keras.models import load_model
import requests
from zipfile import ZipFile
import os

MODEL_PATH = './model'
MODEL_ZIPPED_FILE_PATH = './model.zip'
MODEL_URL = 'https://drive.google.com/u/0/uc?id=1-iMxqa019ST5_sApayrS42cS6ulRvIrs&export=download&confirm=t'

def is_downloaded():
    return os.path.isdir(MODEL_PATH)
    

def download_model():
    print("Downloading... ", sep='')
    response = requests.get(MODEL_URL)
    with open(MODEL_ZIPPED_FILE_PATH, "wb") as f:
        f.write(response.content)
    print("[Done]")
    
    print("Extracting... ", sep='')
    with ZipFile(MODEL_ZIPPED_FILE_PATH, 'r') as f:
        f.extractall()
    print("[Done]")


def get_model():
    if not is_downloaded():
        download_model()

    print("Loading Model... ", sep='')
    model = load_model(MODEL_PATH)
    print("[Done]")
    return model