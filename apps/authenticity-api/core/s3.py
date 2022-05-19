import boto3
from .env import S3_ACCESS_KEY_ID, S3_SECREET_ACCESS_KEY

BUCKET_NAME = 'autentisk'


def get_client():
    return boto3.client('s3',
                        endpoint_url='https://s3.filebase.com',
                        aws_access_key_id=S3_ACCESS_KEY_ID,
                        aws_secret_access_key=S3_SECREET_ACCESS_KEY)


def get_vectors(client=get_client()):
    res = client.list_objects_v2(Bucket=BUCKET_NAME,
                                 Delimiter='/', Prefix="vectors"
                                 )
    return res['Contents'] if ("Contents" in res.keys()) else []
