from urllib.parse import unquote
import numpy as np
import uvicorn
import os
from fastapi import FastAPI
from core.unit import parse_ether
from core.token_metadata import get_image_url
from core.image import load_image
from core.contract import get_request_id
from core.encoder import get_encoder
from core.s3 import get_vectors_key, upload_vector
from core.ipfs import get_cid

app = FastAPI()


@app.get("/")
async def root(tokenUri: str = None):
    if tokenUri is None:
        return {"similarity": 0}

    tokenUri = unquote(unquote(tokenUri))

    request_id = get_request_id(tokenUri)
    if request_id is None:
        return {"similarity": 0}

    image_url = get_image_url(tokenUri)
    image = load_image(image_url)

    encoder = get_encoder()
    query_vec = encoder([image])

    vec_list = get_vectors_key()
    if len(vec_list) == 0:
        upload_vector(query_vec, get_cid(tokenUri))
        return {"simialirty": 0}
    
    dataset_vec = [download_vector()]


    return {"similarity": parse_ether(1)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT") or 8000))
