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


def encode(image):
    return encoder(np.array([image]))[0]


def find_similarities(vec_keys, query_vec):
    dataset_vec = [download_vector(key) for key in vec_keys]

    closest: np.float64 = cosine(query_vec, dataset_vec[0])
    closest_key: str = vec_keys[0]

    for [key, vec] in zip(vec_keys[1:], dataset_vec[1:]):
        dist = cosine(query_vec, vec)
        if dist < closest:
            closest = dist
            closest_key = key

    return closest, closest_key


async def save_record(prisma: Prisma, uri_sig: str, closest: np.float64, image_url: str):
    print("Saving similarity... ", end="")
    await prisma.similarity.create(data={
        'id': uri_sig,
        'similarity': closest,
        'imageUrl': image_url
    })
    print("[Done]")


async def save_similar_image(prisma: Prisma, query_key: str, closest_key: str):
    print("Saving closest similarity... ", end="")
    await prisma.closestsimilarity.create(data={
        'incomingId': query_key,
        'originalId': closest_key,
    })
    print("[Done]")


@app.get("/")
async def root(tokenUri: str = None):
    # URI Check
    if tokenUri is None:
        return {"error": "1", "detail": "Missing token URI"}
    tokenUri = unquote(unquote(tokenUri))

    # Request ID Check
    request_id = get_request_id(tokenUri)
    if request_id is None:
        return {"error": "2", "detail": "Request not coming from contract"}

    print(f"Processing tokenURI: \"{tokenUri}\" for request: \"{request_id}\"")

    prisma = Prisma()
    await prisma.connect()
    uri_sig = get_sig(tokenUri)

    # Find for existing data
    print("Searching for existing data... ", end="")
    stored = await prisma.similarity.find_unique(where={'id': uri_sig})
    if stored is not None:
        print("Found duplicate request, using previous result.")
        return {"similarity": parse_ether(stored.similarity)}
    else:
        print("[Data is New]")

    image_url = get_image_url(tokenUri)
    image = load_image(image_url)
    print("Encoding image... ", end="")
    query_vec = encode(image)
    print("[Done]")

    vec_keys = get_vectors_key()
    new_data = len(vec_keys) == 0
    if new_data:
        print("Accepting image since the dataset is empty.")
        similarity = str(parse_ether(99))

        await save_record(prisma, uri_sig, similarity, image_url)
        upload_vector(np.array(query_vec), uri_sig)

        return {"similarity": similarity}

    closest, closest_key = find_similarities(vec_keys, query_vec)

    accepted = closest >= get_similarity_threshold()
    if accepted:
        print("Accepted")
        upload_vector(np.array(query_vec), uri_sig)
    else:
        print(f"Rejected")
        await save_similar_image(prisma, uri_sig, closest_key)

    similarity = str(parse_ether(closest))
    await save_record(prisma, uri_sig, similarity, image_url)
    return {"similarity": similarity}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(PORT or 8000))
