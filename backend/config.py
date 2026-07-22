import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    KITE_API_KEY = os.getenv("KITE_API_KEY")
    KITE_API_SECRET = os.getenv("KITE_API_SECRET")
    KITE_REQUEST_TOKEN = os.getenv("KITE_REQUEST_TOKEN")

settings = Settings()
