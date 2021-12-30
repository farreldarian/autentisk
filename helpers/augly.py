from PIL import Image
import augly.image as imaugs
import random


def overlay_text(img): return imaugs.overlay_text(img)
def overlay_emoji(img): return imaugs.overlay_emoji(img)
def meme_format(img): return imaugs.meme_format(img)


transform_functions = [overlay_text, overlay_emoji, meme_format]


def augly_augment(image: Image) -> Image:
    transform = random.choice(transform_functions)
    return transform(image)
