from PIL import Image
import augly.image as imaugs
import augly.utils as utils
import os
import random


def random_color():
    return (
        random.randint(0, 255),
        random.randint(0, 255),
        random.randint(0, 255)
    )


def overlay_text(img):
    text_len = random.randint(5, 20)
    return imaugs.overlay_text(
        img,
        text=[random.randrange(1, 100) for _ in range(text_len)],
        font_file=os.path.join(utils.FONTS_DIR, 'OpenSans-Regular.ttf'),
        x_pos=random.uniform(0, 0.5),
        y_pos=random.uniform(0, 0.5),
        color=random_color()
    )


def overlay_emoji(img):
    emoji_type = random.choice(os.listdir(utils.EMOJI_DIR))
    emoji_dir = os.path.join(utils.EMOJI_DIR, emoji_type)

    return imaugs.overlay_emoji(
        img,
        emoji_path=os.path.join(
            emoji_dir, random.choice(os.listdir(emoji_dir))),
        emoji_size=random.uniform(0.15, 0.4),
        x_pos=random.uniform(0, 0.5),
        y_pos=random.uniform(0, 0.5),
    )


def meme_format(img):
    imaugs.meme_format(
        img,
        text=random.choice(["LOL", "RIP", "GM", "GN", "LFG", "PAMP"]),
        caption_height=random.randint(75, 125),
        meme_bg_color=random_color(),
        text_color=random_color()
    )


def shuffle_pixel(img):
    return imaugs.shuffle_pixels(img, factor=random.uniform(0.1, 0.3), seed=None)


def transform_perspective(img):
    return imaugs.perspective_transform(img, sigma=random.randint(10, 20), seed=None)


transform_functions = [overlay_text, overlay_emoji,
                       meme_format, shuffle_pixel, transform_perspective]


def augly_augment(image: Image) -> Image:
    transform = random.choice(transform_functions)
    return transform(image)
