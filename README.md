# 🔗 AI-Powered URL Shortener Dashboard

A modern full-stack URL Shortener Dashboard built with **React, Express.js, PostgreSQL, and Prisma ORM**. This application allows users to create, manage, and analyze shortened URLs with real-time analytics through a responsive dashboard.

---

## 📌 Project Overview

This project was developed as part of an assignment to build a lightweight URL shortening platform similar to Bitly for internal marketing campaigns.

Users can:

- Create shortened URLs
- Set custom aliases
- Set expiration dates
- Track click analytics
- Enable/Disable links
- Search and manage links
- View analytics with interactive charts

---

## ✨ Features

### Dashboard

- 📊 Total Links
- 🖱️ Total Clicks
- ✅ Active Links
- ⏰ Expired Links
- 🔍 Search Links
- 📄 Pagination
- 📱 Responsive Design

---

### URL Management

- Create Short URL
- Update Existing URL
- Soft Delete URL
- Enable / Disable URL
- Copy Short URL
- Custom Alias Support
- Expiration Date Support

---

### Analytics

For every click the application stores:

- Timestamp
- Browser
- Operating System
- Device Type
- Country (Mock/Localhost)
- Referrer

Analytics Dashboard includes:

- Daily Click Chart
- Browser Distribution
- Device Distribution
- Country Distribution
- Top Referrers
- Total Clicks

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- React Query
- Axios
- Tailwind CSS
- Recharts
- React Icons
- React Hot Toast

---

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

---

### Database

- PostgreSQL

---

## 📂 Project Structure

```
ai-url-shortener/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── layouts/
│   │   └── App.jsx
│
├── docs/
├── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>

cd ai-url-shortener
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/url_shortener"

PORT=5000
```

Run Prisma

```bash
npx prisma generate

npx prisma migrate dev
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Application

```
Frontend

http://localhost:5173

Backend

http://localhost:5000
```

---

## 📌 REST APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/links | Create Short URL |
| GET | /api/links | Get All Links |
| GET | /api/links/:id | Get Link Details |
| PUT | /api/links/:id | Update Link |
| PATCH | /api/links/:id/status | Enable/Disable Link |
| DELETE | /api/links/:id | Soft Delete Link |
| GET | /api/links/r/:shortCode | Redirect URL |
| GET | /api/analytics/:id | Analytics |
| GET | /api/dashboard/stats | Dashboard Statistics |

---

## 📊 Database Schema

### Link

- id
- title
- originalUrl
- shortCode
- customAlias
- clickCount
- isActive
- expiresAt
- createdAt
- updatedAt
- deletedAt

---

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

## 📷 Screenshots

### Dashboard

> Add dashboard screenshot here.

---

### Create Link

> Add create link modal screenshot here.

---

### Analytics

> Add analytics page screenshot here.

---

## 🔒 Input Validation

The application validates:

- Valid URLs
- Required Fields
- Duplicate Custom Aliases
- Expired Links
- Disabled Links

---

## 📈 Future Enhancements

- JWT Authentication
- User Accounts
- QR Code Generation
- Custom Domains
- Dark Mode
- Export Analytics
- Docker Deployment
- CI/CD Pipeline

---

## 👨‍💻 Author

**Akhila**

Full Stack Developer

---

## 📄 License

This project is developed for educational and portfolio purposes.