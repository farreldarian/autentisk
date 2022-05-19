from urllib.parse import unquote
import numpy as np
import uvicorn
import os
from fastapi import FastAPI
from scipy.spatial.distance import cosine
from core.unit import parse_ether
from core.token_metadata import get_image_url
from core.image import load_image
from core.contract import get_request_id
from core.encoder import get_encoder
from core.s3 import get_vectors_key, upload_vector, download_vector
from core.ipfs import get_cid

app = FastAPI()
encoder = get_encoder()


@app.get("/")
async def root(tokenUri: str = None):
    if tokenUri is None:
        return {"error": "1", "detail": "Missing token URI"}

    tokenUri = unquote(unquote(tokenUri))

    request_id = get_request_id(tokenUri)
    if request_id is None:
        return {"error": "2", "detail": "Request not coming from contract"}

    image_url = get_image_url(tokenUri)
    image = load_image(image_url)

    query_vec = encoder(np.array([image]))

    vec_keys = get_vectors_key()
    if len(vec_keys) == 0:
        upload_vector(np.array(query_vec), get_cid(tokenUri))
        return {"simialirty": 0}
    
    dataset_vec = [download_vector(key) for key in vec_keys]
    closest = float('inf')
    for vec in dataset_vec:
        dist = cosine(query_vec, vec)
        closest = np.min([dist, closest])

    return {"similarity": parse_ether(closest)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT") or 8000))
