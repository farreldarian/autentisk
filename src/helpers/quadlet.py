import random
import numpy as np
from PIL import Image
import augly.image as imaugs
import matplotlib.image as mpimg

from .dataset import Dataset
from .distance import euclidian_distance
from .utils import clamp_minimum


def augment(image):
    augment = random.choice([imaugs.meme_format, imaugs.overlay_text])
    pil_image = Image.fromarray(image)
    augmented_image = augment(pil_image)
    return np.array(augmented_image)


def intermediate_image(collection, image_file):
    image_files = Dataset().collection_images(collection, [image_file])
    return random.choice(image_files)


def negative_image(collection):
    dataset = Dataset()
    collection_category = dataset.collection_category(collection)

    chosen_category = random.choice(dataset.categories([collection_category]))
    chosen_collection = random.choice(dataset.collections(chosen_category))
    yield chosen_collection
    yield random.choice(dataset.collection_images(chosen_collection))


def generate_quadlet(collection: str, image_name: str):
    dataset = Dataset()

    anchor = dataset.load_image(collection, image_name)
    positive = augment(anchor)
    intermediate = dataset.load_image(
        collection,
        intermediate_image(collection, image_name)
    )
    negative_collection, negative_image_file = negative_image(collection)
    negative = dataset.load_image(negative_collection, negative_image_file)

    return [anchor, positive, intermediate, negative]


def quadlet_loss(query, positive, intermediate, negative, g1=0.7, g2=0.3, g3=0.5):
    loss_1 = clamp_minimum(g1 + np.sum(euclidian_distance(query, positive) -
                                       euclidian_distance(query, negative)))
    loss_2 = clamp_minimum(g2 + np.sum(euclidian_distance(query, positive) -
                                       euclidian_distance(query, intermediate)))
    loss_3 = clamp_minimum(g3 + np.sum(euclidian_distance(query, intermediate) -
                                       euclidian_distance(query, negative)))
    return loss_1 + loss_2 + loss_3
