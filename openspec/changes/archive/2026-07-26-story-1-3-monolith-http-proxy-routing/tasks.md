## 1. gRPC Client Setup in Monolith

- [x] 1.1 Configure gRPC client in Monolith to connect to Swing-Trading Service
- [x] 1.2 Implement a 5-second context timeout wrapper for gRPC calls

## 2. Reverse Proxy Implementation

- [x] 2.1 Update Monolith `/api/holdings` and other Kite-related endpoints to forward requests to the gRPC client
- [x] 2.2 Handle gRPC response serialization to JSON for the HTTP response
- [x] 2.3 Implement error handling to return HTTP 504 on `DeadlineExceeded` gRPC error

## 3. Testing and Validation

- [x] 3.1 Write unit tests for the reverse proxy routing logic
- [x] 3.2 Write tests to verify the 5-second timeout returns HTTP 504
