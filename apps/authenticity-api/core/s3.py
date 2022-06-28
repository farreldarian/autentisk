import boto3
import io
import pickle
import numpy as np
from .unit import format_ether
from .env import S3_ACCESS_KEY_ID, S3_SECREET_ACCESS_KEY

BUCKET_NAME = 'autentisk'


def get_client():
    return boto3.client('s3',
                        endpoint_url='https://s3.filebase.com',
                        aws_access_key_id=S3_ACCESS_KEY_ID,
                        aws_secret_access_key=S3_SECREET_ACCESS_KEY)


def get_vectors_key(client=get_client()):
    res = client.list_objects_v2(Bucket=BUCKET_NAME,
                                 Delimiter='/', Prefix="vectors/"
                                 )
    if "Contents" not in res.keys():
        return []

    keys = [content['Key'] for content in res['Contents']]
    return [key for key in keys if key != 'vectors/']


def upload_vector(vector, name, client=get_client()):
    arr = io.BytesIO()
    pickle.dump(np.array(vector), arr)
    arr.seek(0)

    client.put_object(
        Body=arr,
        Bucket=BUCKET_NAME,
        Key=f"vectors/{name}"
    )


def download_vector(key, client=get_client()):
    arr = io.BytesIO()
    response = client.download_fileobj(
        Bucket=BUCKET_NAME,
        Key=key,
        Fileobj=arr
    )
    arr.seek(0)
    arr = pickle.load(arr)
    return np.array(arr)
