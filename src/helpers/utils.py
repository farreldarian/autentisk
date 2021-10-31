import os


def make_dir_if_not_exists(path: str):
    if os.path.isdir(path):
        return

    os.makedirs(path)
