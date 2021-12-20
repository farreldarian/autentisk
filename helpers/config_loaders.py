from pathlib import Path
import yaml
from os.path import isfile


def load_dataset_config():
    path = Path(__file__).parent.joinpath('../configs/dataset.yml')
    if not isfile(path):
        raise Exception(f"Can't locate config path in {path}")

    with open(path) as f:
        return yaml.load(f, Loader=yaml.FullLoader)
