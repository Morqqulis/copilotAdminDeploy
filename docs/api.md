# RadioCopilot API Documentation

## Authentication

All API requests require an API key to be included in the headers:

```bash
X-API-Key: your-api-key-here
```

You can generate an API key in the Settings page of the admin panel.

## Endpoints

### Stations

#### Get all stations
```bash
GET /api/stations

# Example
curl -X GET https://api.radiocopilot.com/api/stations \
  -H "X-API-Key: your-api-key"
```

#### Create station
```bash
POST /api/stations

# Example
curl -X POST https://api.radiocopilot.com/api/stations \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Radio NYC",
    "stationId": "nyc1",
    "locationId": 1,
    "omniplayerUrl": "https://nyc.omniplayer.com",
    "clientId": "client_id",
    "clientSecret": "client_secret",
    "username": "username",
    "password": "password",
    "language": "en",
    "status": "active"
  }'
```

#### Update station
```bash
PUT /api/stations/{id}

# Example
curl -X PUT https://api.radiocopilot.com/api/stations/1 \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Radio NYC Updated"
  }'
```

#### Delete station
```bash
DELETE /api/stations/{id}

# Example
curl -X DELETE https://api.radiocopilot.com/api/stations/1 \
  -H "X-API-Key: your-api-key"
```

### Voices

#### Get all voices
```bash
GET /api/voices

# Example
curl -X GET https://api.radiocopilot.com/api/voices \
  -H "X-API-Key: your-api-key"
```

#### Create voice
```bash
POST /api/voices

# Example
curl -X POST https://api.radiocopilot.com/api/voices \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "voiceId": "pQB83Phx1CmQQkTQxu6o",
    "gender": "male",
    "language": "English",
    "country": "US",
    "category": "voicetracking",
    "status": "active"
  }'
```

#### Update voice
```bash
PUT /api/voices/{id}

# Example
curl -X PUT https://api.radiocopilot.com/api/voices/1 \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith Updated"
  }'
```

#### Delete voice
```bash
DELETE /api/voices/{id}

# Example
curl -X DELETE https://api.radiocopilot.com/api/voices/1 \
  -H "X-API-Key: your-api-key"
```

### Clients

#### Get all clients
```bash
GET /api/clients

# Example
curl -X GET https://api.radiocopilot.com/api/clients \
  -H "X-API-Key: your-api-key"
```

#### Create client
```bash
POST /api/clients

# Example
curl -X POST https://api.radiocopilot.com/api/clients \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Media Group",
    "email": "contact@johnmedia.com",
    "company": "John Media Holdings",
    "status": "active"
  }'
```

## Response Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized (Invalid or missing API key)
- 404: Not Found
- 500: Server Error

## Rate Limiting

API requests are limited to 100 requests per minute per API key. 