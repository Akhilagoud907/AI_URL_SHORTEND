# Project Approach

## Objective

The goal of this project is to develop a lightweight AI-Powered URL Shortener Dashboard similar to Bitly that allows users to create, manage, and analyze shortened URLs through a responsive web application.

---

## Development Approach

The project was developed using a full-stack architecture consisting of:

- React.js for the frontend
- Express.js for the backend
- PostgreSQL as the database
- Prisma ORM for database operations

The application was built incrementally by implementing each feature independently before integrating them into a complete system.

---

## Phase 1 – Backend Setup

Implemented:

- Express Server
- PostgreSQL Database
- Prisma ORM
- Folder Structure
- REST API Architecture

---

## Phase 2 – URL Management

Implemented APIs for:

- Create Short URL
- Update URL
- Soft Delete URL
- Get All URLs
- Get URL by ID

Features:

- Auto-generated short codes
- Optional custom aliases
- Expiration date support
- Duplicate alias validation

---

## Phase 3 – URL Redirection

Implemented:

- Redirect endpoint
- Expired link validation
- Disabled link validation
- Click counter

---

## Phase 4 – Analytics

Collected information for every redirect:

- Timestamp
- Browser
- Operating System
- Device
- Country
- Referrer

Displayed analytics using charts.

---

## Phase 5 – Frontend Dashboard

Built a responsive dashboard containing:

- Statistics Cards
- Links Table
- Search
- Pagination
- Create/Edit/Delete operations

---

## Phase 6 – UI Improvements

Enhanced the interface with:

- Tailwind CSS
- React Icons
- Better spacing
- Modern cards
- Responsive layout

---

## Final Outcome

The application satisfies all business and technical requirements specified in the assignment and provides a clean, responsive user experience.