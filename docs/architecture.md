# System Architecture

## Architecture Overview

The application follows a three-tier architecture.

```
                +----------------------+
                |      React App       |
                +----------+-----------+
                           |
                      REST API Calls
                           |
                +----------v-----------+
                |    Express Server    |
                +----------+-----------+
                           |
                     Prisma ORM
                           |
                +----------v-----------+
                |    PostgreSQL DB     |
                +----------------------+
```

---

## Frontend

Technologies:

- React
- React Router
- React Query
- Axios
- Tailwind CSS

Responsibilities:

- Dashboard
- URL Management
- Analytics
- Search
- Pagination

---

## Backend

Technologies:

- Node.js
- Express.js
- Prisma ORM

Responsibilities:

- REST APIs
- Validation
- Redirect Handling
- Analytics Collection
- Business Logic

---

## Database

Database:

PostgreSQL

Tables:

### Link

- id
- title
- originalUrl
- shortCode
- customAlias
- clickCount
- expiresAt
- isActive
- createdAt
- updatedAt
- deletedAt

### Click

- id
- timestamp
- browser
- operatingSystem
- device
- country
- referrer
- linkId

---

## API Flow

1. User submits URL.
2. Backend validates input.
3. Short code is generated.
4. Record is stored in PostgreSQL.
5. Frontend refreshes automatically.

For redirect requests:

1. User visits short URL.
2. Backend validates the link.
3. Analytics are recorded.
4. User is redirected to the original URL.