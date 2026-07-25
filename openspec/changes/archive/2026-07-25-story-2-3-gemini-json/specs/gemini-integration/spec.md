## ADDED Requirements

### Requirement: Gemini API Request
The system SHALL send a prompt to the Gemini 1.5 Pro API containing the unstructured market data and instructions to output a strict JSON format containing Entry, Target, and Stop-Loss fields.

#### Scenario: Successful prompt generation
- **WHEN** the market data is passed to the parser
- **THEN** the system sends a request to the Gemini API with instructions to return only a JSON object.

### Requirement: JSON Validation
The system SHALL parse the response from the Gemini API as a strict JSON object and extract the required fields.

#### Scenario: Valid JSON received
- **WHEN** Gemini returns a valid JSON string
- **THEN** the system parses the JSON and extracts the Entry, Target, and Stop-Loss values cleanly.

### Requirement: Error Handling for Timeouts and Formatting
The system SHALL handle API timeouts, connection errors, and JSON formatting errors gracefully without crashing the application.

#### Scenario: API Timeout
- **WHEN** the Gemini API request times out
- **THEN** the system catches the timeout exception and returns/logs an appropriate error message instead of crashing.

#### Scenario: Invalid JSON received
- **WHEN** Gemini returns a response that cannot be parsed as JSON
- **THEN** the system catches the parsing error and returns/logs an appropriate error message instead of crashing.
