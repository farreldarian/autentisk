from pathlib import Path
from termcolor import cprint
import os
import hashlib

from helpers.utils import get_file_hash, listdir, print_red_if_error

dataset_path = Path('dataset')


def main():
    summary = {
        'n_collection': 0,
        'n_images': 0,
        'duplicate_id': 0,
        'invalid_extension': 0,
        'similar_content': 0
    }

    for collection in listdir(dataset_path):
        summary['n_collection'] += 1

        print("----------------------------------------------")
        print(f'Checking {collection}')

        tokens = {}
        image_hashes = {}
        n_tokens = 0
        n_removed = 0
        for token_file in listdir(dataset_path / collection):
            summary['n_images'] += 1

            id, ext = token_file.split('.')

            # Check duplicates
            if id not in tokens:
                tokens[id] = token_file
            else:
                summary['duplicate_id'] += 1
                print('Found duplicate token')
                print(f'{token_file} with {tokens[id]}')

            # Check extension
            if ext != 'jpeg':
                summary['invalid_extension'] += 1
                print(f'Invalid extension for {token_file}')

            # Check image hash
            hash = get_file_hash(dataset_path / collection / token_file)
            if hash in image_hashes:
                summary['similar_content'] += 1
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

    print("#---------#")
    print("# Summary #")
    print("#---------#")

    print_red_if_error(
        f"Total collections: {summary['n_collection']}", summary['n_collection'] != 20)
    print_red_if_error(
        f"Total images: {summary['n_images']}", summary['n_images'] != 50_000)
    print('')
    print("- Problems")
    print_red_if_error(
        f"Duplicate token id: {summary['duplicate_id']}", summary['duplicate_id'] != 0)
    print_red_if_error(
        f"Invalid extension: {summary['invalid_extension']}", summary['invalid_extension'] != 0)
    print_red_if_error(
        f"Similar (or exact) content: {summary['similar_content']}", summary['similar_content'] != 0)


main()
