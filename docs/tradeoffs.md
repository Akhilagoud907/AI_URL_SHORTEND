# Design Tradeoffs

During development, several design decisions were made to balance simplicity, maintainability, and project requirements.

---

## 1. Prisma ORM

Chosen because:

- Easy database access
- Type-safe queries
- Clean code
- Faster development

Tradeoff:

- Slight abstraction over raw SQL.

---

## 2. PostgreSQL

Chosen because:

- Reliable
- Open-source
- Supports complex queries

Tradeoff:

- Slightly heavier than SQLite.

---

## 3. React Query

Chosen because:

- Automatic caching
- Refetch support
- Loading state management

Tradeoff:

- Adds an additional dependency.

---

## 4. Soft Delete

Chosen because:

- Prevents accidental data loss.
- Preserves analytics history.
- Allows future recovery.

Tradeoff:

- Deleted records remain in the database and must be filtered in queries.

---

## 5. Tailwind CSS

Chosen because:

- Fast UI development
- Utility-first styling
- Responsive by default

Tradeoff:

- Long class names can reduce readability.

---

## 6. Mock Country Detection

Country detection uses a mock implementation for local development.

Tradeoff:

- Not suitable for production-level geolocation accuracy.

---

## Future Improvements

- JWT Authentication
- Docker Deployment
- Redis Cache
- QR Code Generation
- Custom Domains
- Role-Based Access Control