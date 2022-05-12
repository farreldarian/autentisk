ETHER_DECIMAL = 10 ** 18


def parse_ether(ether):
    return ether * ETHER_DECIMAL


def format_ether(wei):
    return wei // ETHER_DECIMAL
