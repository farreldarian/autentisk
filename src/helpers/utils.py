import os
from typing import List


def make_dir_if_not_exists(path: str):
    if os.path.isdir(path):
        return

    os.makedirs(path)


def listdir(path: str, ignores=['.DS_Store']) -> List[str]:
    items = os.listdir(path)
    return [item for item in items if item not in ignores]
