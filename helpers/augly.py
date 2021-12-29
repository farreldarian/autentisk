from PIL import Image
import augly.image as imaugs

creative_trans = [imaugs.OverlayText(),
                  imaugs.OverlayStripes(),
                  imaugs.OverlayEmoji(),
                  imaugs.OverlayOntoScreenshot(),
                  imaugs.MemeFormat()]


def augly_augment(image: Image) -> Image:
    transform = imaugs.OneOf(creative_trans)
    return transform(image)
