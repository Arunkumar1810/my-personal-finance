## 1. Setup and Integration

- [x] 1.1 Ensure `google-generativeai` is installed and available in the backend dependencies.
- [x] 1.2 Initialize the Gemini API client using the environment variable `GEMINI_API_KEY`.

## 2. Core Implementation

- [x] 2.1 Create a prompt template instructing Gemini to extract Entry, Target, and Stop-Loss fields as a strict JSON object.
- [x] 2.2 Create a function to send the unstructured Moneycontrol market data and prompt to the Gemini 1.5 Pro model.
- [x] 2.3 Implement logic to strip any potential markdown wrapping (e.g., ````json ... ````) from the returned text.
- [x] 2.4 Parse the cleaned response string into a Python dictionary using `json.loads`.

## 3. Error Handling

- [x] 3.1 Wrap the Gemini API request in a try-except block to catch timeout and API-related exceptions, returning a safe default or logging the error.
- [x] 3.2 Wrap the JSON parsing logic in a try-except block to catch `json.JSONDecodeError`, logging the malformed payload instead of crashing.
