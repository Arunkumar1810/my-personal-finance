## 1. Setup FastAPI and Kite Connect

- [x] 1.1 Scaffold a basic FastAPI application
- [x] 1.2 Add `kiteconnect` and `python-dotenv` to dependencies
- [x] 1.3 Create a configuration module to load Kite API credentials from `.env`
- [x] 1.4 Implement Kite API authentication on application startup

## 2. Holdings Cache Implementation

- [x] 2.1 Set up a SQLite database connection for the backend
- [x] 2.2 Create a database schema for storing portfolio holdings
- [x] 2.3 Implement a function to fetch holdings from Kite API
- [x] 2.4 Implement a function to save fetched holdings to the SQLite cache
- [x] 2.5 Hook up the fetch and save logic to run after successful Kite authentication

## 3. WebSocket Server Setup

- [x] 3.1 Add a WebSocket endpoint to the FastAPI application
- [x] 3.2 Create a connection manager to handle connected clients and broadcasts
- [x] 3.3 Implement logic to push the cached holdings payload to connected clients
