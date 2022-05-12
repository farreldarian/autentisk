from urllib import request
import numpy as np
from PIL import Image
from io import BytesIO


def load_image(URL):
    with request.urlopen(URL) as url:
        img = Image\
            .open(BytesIO(url.read()))\
            .convert('RGB')\
            .resize((224, 224))

    return np.array(img)
