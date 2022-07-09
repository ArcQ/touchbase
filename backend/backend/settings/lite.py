from .base import *

ENV = "DEV"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS += [
    "livereload",
    'drf_generators',
    'django_seed',
    # "debug_toolbar",
]


# MIDDLEWARE.insert(0, "debug_toolbar.middleware.DebugToolbarMiddleware")
MIDDLEWARE.append("livereload.middleware.LiveReloadScript")

INTERNAL_IPS = [
    "0.0.0.0",
    "127.0.0.1",
    "localhost",
]

# dont cache in dev
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "parallel-web-locmem",
    },
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LOGGING = {
    "version": 1,
    "filters": {
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
        }
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": False,
        },
        "django.db.backends": {
            "level": "DEBUG",
            "handlers": ["console"],
        },
    },
}

# CHAIN_ID = 42  # kovan
# CONTRACT_ADDRESS_1155 = "0x51670C70fd50f14F846412CbeF15D293395b47aF"  # on kovan
# CONTRACT_ADDRESS_PAY_MINT = "0xd9D96DA161Bc48323Ae0034A1fAfD075707aeA65"  # new kovan
# ETH_RPC_URL = "https://kovan.infura.io/v3/59a36e39ab36434b8473aa313ef7db7b"  # kovan
START_BLOCK = 27249219  # kovan

CHAIN_ID = 137  # polygon
CONTRACT_ADDRESS_1155 = "0xd67d46127b08780284f0Eb2d258A9812b2119386"  # polygon
CONTRACT_ADDRESS_PAY_MINT = "0xebeEc5aE048c857FeE4b8E0ad26620E6Acf6e9d4"  # polygon
# ETH_RPC_URL = "https://polygon-mainnet.infura.io/v3/ffcf9689e8774fbcbb2497d5b3406153"  # polygon
ETH_RPC_URL = "https://old-little-star.matic.quiknode.pro/573995592aadf45079a20119825b7dbce9586f31/"
START_BLOCK = 19387490  # polygon

NFT_BASE_URI = "http://stg.ndfstarter.io/nft-data"


print("running in dev")
CORS_ORIGIN_ALLOW_ALL = True  # only for dev environment!, this should be changed before you push to production

FIREBASE_CREDENTIALS_PATH = os.path.join(BASE_DIR, 'backend', 'settings',
                                         'google_keys', 'nfdstarterproj-firebase-adminsdk-84s7z-2b36d89953.json')

LOGGING = {
    "version": 1,
    "filters": {
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
        }
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    "loggers": {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
        "django.db.backends": {
            "level": "DEBUG",
            "handlers": ["console"],
        }
    },
}
