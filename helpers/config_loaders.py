from pathlib import Path
import yaml
from os.path import isfile

DATASET_CONFIG_PATH = '../../configs/dataset.yml'


def load_dataset_config():
    path = Path(__file__).parent.joinpath(DATASET_CONFIG_PATH)
    if not isfile(path):
        raise Exception(f"Can't locate config path in {path}")

    with open(path) as f:
        return yaml.load(f, Loader=yaml.FullLoader)
