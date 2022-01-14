from pathlib import Path
import os
import hashlib

from helpers.utils import listdir

dataset_path = Path('dataset')


def main():
    collections = listdir(dataset_path)

    for collection in collections:
        print("----------------------------------------------")
        print(f'Checking {collection}')

        tokens = {}
        image_hashes = {}
        n_tokens = 0
        n_removed = 0
        for token_file in listdir(dataset_path / collection):
            id, ext = token_file.split('.')

            # Check duplicates
            if id not in tokens:
                tokens[id] = token_file
            else:
                print('Found duplicate token')
                print(f'{token_file} with {tokens[id]}')

            # Check extension
            if ext != 'jpeg':
                print(f'Invalid extension for {token_file}')

            # Check image hash
            hash_func = hashlib.sha256()
            with open(dataset_path / collection / token_file, 'rb') as f:
                while True:
                    data = f.read(65536)
                    if not data:
                        break
                    hash_func.update(data)
                hash = hash_func.hexdigest()
                if hash in image_hashes:
                    print(
                        f'[Duplicate Hash] {hash[56:]} from {token_file} with {image_hashes[hash]}')
                    print(f"Removing {token_file}")
                    os.remove(dataset_path / collection / token_file)
                else:
                    image_hashes[hash] = token_file

            n_tokens += 1

        print("")
        print(f"Original Total: {n_tokens} tokens")
        print(f"Removed: {n_removed} tokens")

    print(f"Total collections: {len(collections)}")


main()
