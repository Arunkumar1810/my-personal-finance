import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    KITE_GRPC_ENDPOINT = os.getenv("KITE_GRPC_ENDPOINT", "localhost:50051")

settings = Settings()
