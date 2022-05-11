import uvicorn
import os
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"similarity": 0}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=os.getenv("PORT") or 8000)