import os
from urllib.parse import quote_plus

from dotenv import load_dotenv

load_dotenv()


# ==============================
# DATABASE CONFIGURATION
# ==============================

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "aihms")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")


DATABASE_URL = (
    f"mysql+pymysql://"
    f"{quote_plus(DB_USER)}:"
    f"{quote_plus(DB_PASSWORD)}@"
    f"{DB_HOST}:"
    f"{DB_PORT}/"
    f"{DB_NAME}"
)


# ==============================
# JWT CONFIGURATION
# ==============================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "your-super-secret-key-change-this-in-production"
)

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        "30"
    )
)