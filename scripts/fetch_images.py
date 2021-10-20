import os
import yaml

# Constants
dataset_config_path = '../configs/dataset.yml'


def load_config(path):
    config_path = os.path.join(
        os.path.dirname(__file__), path)

    if not os.path.isfile(config_path):
        raise Exception(f"Can't locate config path in {config_path}")

    with open(config_path) as f:
        data = yaml.load(f, Loader=yaml.FullLoader)

    return data


if __name__ == '__main__':
    config = load_config(dataset_config_path)
