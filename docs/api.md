# API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# 1. Create Short URL

### Endpoint

```
POST /links
```

### Description

Creates a new shortened URL.

### Request Body

```json
{
  "title": "GitHub",
  "originalUrl": "https://github.com",
  "customAlias": "github",
  "expiresAt": "2028-01-01"
}
```

### Success Response

**201 Created**

```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "GitHub",
    "originalUrl": "https://github.com",
    "shortCode": "github"
  }
}
```

### Error Responses

#### Duplicate Alias

```json
{
  "success": false,
  "message": "Custom alias already exists"
}
```

#### Validation Error

```json
{
  "success": false,
  "message": "Invalid URL"
}
```

---

# 2. Get All Links

### Endpoint

```
GET /links
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | Number | Current page |
| limit | Number | Records per page |
| search | String | Search by title or URL |

Example

```
GET /links?page=1&search=github
```

### Success Response

```json
{
  "success": true,
  "total": 5,
  "page": 1,
  "totalPages": 1,
  "data": []
}
```

---

# 3. Get Link Details

### Endpoint

```
GET /links/:id
```

Example

```
GET /links/cmrf0cl0d0000w96kqetqkjro
```

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Link not found"
}
```

---

# 4. Update Link

### Endpoint

```
PUT /links/:id
```

### Request Body

```json
{
  "title": "Updated GitHub",
  "originalUrl": "https://github.com",
  "customAlias": "github",
  "expiresAt": "2029-01-01"
}
```

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

# 5. Enable / Disable Link

### Endpoint

```
PATCH /links/:id/status
```

### Description

Toggles the status of a short URL.

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

# 6. Delete Link

### Endpoint

```
DELETE /links/:id
```

### Description

Performs a soft delete.

### Success Response

```json
{
  "success": true,
  "message": "Link deleted successfully"
}
```

---

# 7. Redirect URL

### Endpoint

```
GET /links/r/:shortCode
```

Example

```
GET /links/r/github
```

### Description

Redirects users to the original URL and records analytics.

### Error Responses

#### Link Not Found

```json
{
  "success": false,
  "message": "Short URL not found"
}
```

#### Link Disabled

```json
{
  "success": false,
  "message": "This link has been disabled"
}
```

#### Link Expired

```json
{
  "success": false,
  "message": "This link has expired"
}
```

---

# 8. Analytics

### Endpoint

```
GET /analytics/:id
```

### Description

Returns analytics for a specific short URL.

### Success Response

```json
{
  "success": true,
  "stats": {
    "totalClicks": 10,
    "activeLinks": 5,
    "expiredLinks": 1
  },
  "dailyClicks": {},
  "browserDistribution": {},
  "deviceDistribution": {},
  "countryDistribution": {},
  "topReferrers": {}
}
```

---

# 9. Dashboard Statistics

### Endpoint

```
GET /dashboard/stats
```

### Success Response

```json
{
  "success": true,
  "stats": {
    "totalLinks": 15,
    "activeLinks": 10,
    "expiredLinks": 2,
    "totalClicks": 124
  }
}
```

---

# HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 410 | Gone (Expired Link) |
| 500 | Internal Server Error |

---

# Validation Rules

- Title is required.
- Original URL is required.
- Original URL must be a valid URL.
- Custom Alias must be unique.
- Deleted links cannot be updated.
- Disabled links cannot be redirected.
- Expired links cannot be redirected.

---

# Notes

- Soft delete is implemented using the `deletedAt` field.
- Analytics are recorded only for successful redirects.
- Pagination is supported for listing links.
- Search supports both title and original URL.