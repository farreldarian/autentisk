from urllib.parse import unquote
import numpy as np
import uvicorn
from fastapi import FastAPI
from scipy.spatial.distance import cosine
from core.env import PORT
from core.unit import parse_ether
from core.token_metadata import get_image_url
from core.image import load_image
from core.contract import get_request_id, get_sig, get_similarity_threshold
from core.encoder import get_encoder
from core.s3 import get_vectors_key, upload_vector, download_vector
from prisma import Prisma

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

    prisma = Prisma()
    await prisma.connect()

    uri_sig = get_sig(tokenUri)
    stored = await prisma.similarity.find_unique(where={'id': uri_sig})
    if stored is not None:
        return {"similarity": parse_ether(stored.similarity)}

    image_url = get_image_url(tokenUri)
    image = load_image(image_url)

    query_vec = encoder(np.array([image]))[0]

    vec_keys = get_vectors_key()
    if len(vec_keys) == 0:
        await prisma.similarity.create(data={
            'id': uri_sig,
            'similarity': 99,
            'imageUrl': image_url
        })
        upload_vector(np.array(query_vec), uri_sig)
        return {"similarity": parse_ether(99)}

    dataset_vec = [download_vector(key) for key in vec_keys]
    closest = float('inf')
    closest_key = None
    for [key, vec] in zip(vec_keys, dataset_vec):
        dist = cosine(query_vec, vec)
        if dist < closest:
            closest = dist
            closest_key = key

    await prisma.similarity.create(data={
        'id': uri_sig,
        'similarity': closest,
        'imageUrl': image_url
    })
    if closest >= get_similarity_threshold():
        upload_vector(np.array(query_vec), uri_sig)
    elif closest_key is not None:
        await prisma.closestsimilarity.create(data={
            'incomingId': uri_sig,
            'originalId': closest_key
        })

    return {"similarity": parse_ether(closest)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(PORT or 8000))
