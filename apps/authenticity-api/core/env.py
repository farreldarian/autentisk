from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("ALCHEMY_API_KEY")
PORT = os.getenv("PORT")
SKIP_REQUEST_ID_CHECK = not not os.getenv("SKIP_REQUEST_ID_CHECK")
S3_ACCESS_KEY_ID = os.getenv("S3_ACCESS_KEY_ID")
S3_SECREET_ACCESS_KEY = os.getenv("S3_SECREET_ACCESS_KEY")
