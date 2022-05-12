from urllib.parse import unquote
import uvicorn
import os
from fastapi import FastAPI
from core.unit import parse_ether
from core.token_metadata import get_image_url
from core.image import load_image
from core.contract import get_request_id

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

    return {"similarity": parse_ether(1)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT") or 8000))
