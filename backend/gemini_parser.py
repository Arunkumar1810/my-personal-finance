import google.generativeai as genai
import json
import logging
from config import settings

logger = logging.getLogger(__name__)

# Task 1.2: Initialize the Gemini API client using the environment variable GEMINI_API_KEY.
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
else:
    logger.warning("GEMINI_API_KEY is not set. Gemini parser will not work.")

def parse_market_data_with_gemini(raw_data: str) -> dict:
    """
    Sends unstructured market data to Gemini 1.5 Pro to extract Entry, Target, and Stop-Loss.
    """
    # Task 2.1: Create a prompt template instructing Gemini to extract fields as strict JSON.
    prompt = f"""
You are a financial data parser and trading assistant. 
Evaluate the following unstructured market data for the trading setup.
Analyze it for high volatility or low edge. If the setup is highly volatile or has a low edge, set "is_sabotaged" to true; otherwise, false.
Extract the Entry, Target, and Stop-Loss values.
Output MUST be a strict JSON object with exactly these keys: "entry", "target", "stop_loss", "is_sabotaged".
Do NOT include any markdown formatting, explanations, or extra text. If a value is missing, set it to null.

Market Data:
{raw_data}
"""
    
    # Task 2.2 & 3.1: Function to send data and prompt, wrapped in try-except.
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        response = model.generate_content(prompt)
    except Exception as e:
        logger.error(f"Gemini API request failed (timeout or API error): {e}")
        return {"error": "API error or timeout"}

    if not response.text:
        logger.error("Empty response received from Gemini.")
        return {"error": "Empty response"}

    text = response.text.strip()
    
    # Task 2.3: Strip potential markdown wrapping (e.g., ```json ... ```)
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
        
    if text.endswith("```"):
        text = text[:-3]
        
    text = text.strip()
    
    # Task 2.4 & 3.2: Parse cleaned string into dict, wrap in try-except for JSONDecodeError.
    try:
        parsed_data = json.loads(text)
        # Ensure is_sabotaged defaults to False if the AI missed it
        if "is_sabotaged" not in parsed_data:
            parsed_data["is_sabotaged"] = False
            
        # Task 1.3: Enforce a 0.5% stop-loss when is_sabotaged is true.
        if parsed_data.get("is_sabotaged") and parsed_data.get("entry") is not None:
            try:
                entry_val = float(parsed_data["entry"])
                target_raw = parsed_data.get("target")
                target_val = float(target_raw) if target_raw is not None else entry_val * 1.01
                
                if target_val >= entry_val:
                    parsed_data["stop_loss"] = round(entry_val * 0.995, 2)
                else:
                    parsed_data["stop_loss"] = round(entry_val * 1.005, 2)
            except (ValueError, TypeError):
                pass

        return parsed_data
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini response as JSON. Payload: {text} | Error: {e}")
        return {"error": "Malformed JSON"}
