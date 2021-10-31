import os
from typing import List


def make_dir_if_not_exists(path: str):
    if os.path.isdir(path):
        return

    os.makedirs(path)


def listdir(path: str, ignores=['.DS_Store']) -> List[str]:
    items = os.listdir(path)
    return [item for item in items if item not in ignores]


def list_without(list_: List, index: int):
    length = len(list_)
    if length < 2:
        return list_

    # First Item
    if index == 0:
        start = index + 1
        return list_[start:]

    # Last Item
    if index == (length - 1):
        return list_[:index]

    before = list_[:index]
    preceding = list_[index+1:]
    return before + preceding
