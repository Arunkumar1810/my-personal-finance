import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    KITE_GRPC_ENDPOINT = os.getenv("KITE_GRPC_ENDPOINT", "localhost:50051")
    KITE_API_KEY = os.getenv("KITE_API_KEY")
    KITE_API_SECRET = os.getenv("KITE_API_SECRET")
    KITE_REQUEST_TOKEN = os.getenv("KITE_REQUEST_TOKEN")
    ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")

settings = Settings()
