# LinkPulse 🔗

A high-performance URL shortener and link analytics platform built with
Next.js, Node.js, Express, PostgreSQL, Redis, and BullMQ.

LinkPulse allows users to create short URLs, manage links, redirect users
quickly, and monitor detailed click analytics through a clean dashboard.

---

## Architecture Overview

- **Frontend:** Built with Next.js and React, providing a clean dashboard for
  creating, managing, and analysing shortened links.

- **Backend:** Node.js and Express.js REST API responsible for URL creation,
  redirection, link management, and analytics APIs.

- **Database:** PostgreSQL is used for persistent storage with Sequelize ORM.

- **Caching:** Redis is used to cache shortened URLs for fast redirection
  and reduce database queries.

- **Async Analytics Processing:** Click events are processed asynchronously
  using BullMQ workers so that URL redirection remains fast.

---

## Tech Stack

### Backend

- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- ORM: Sequelize
- Caching: Redis
- Queue: BullMQ
- Validation: Zod
- Rate Limiting: express-rate-limit
- Authentication/Utilities: Node.js middleware
- Containerization: Docker, Docker Compose

### Frontend

- Framework: Next.js
- Library: React
- Styling: Vanilla CSS
- State Management: React Hooks
- API Integration: REST APIs

---

## Repository Structure

```text
LinkPulse/
│
├── backend/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   ├── test-api.js
│   │
│   └── src/
│       ├── config/
│       │   ├── db.js
│       │   └── redis.js
│       │
│       ├── controllers/
│       │   ├── link.controller.js
│       │   └── redirect.controller.js
│       │
│       ├── middlewares/
│       │   └── rateLimiter.js
│       │
│       ├── models/
│       │   ├── Link.js
│       │   ├── Click.js
│       │   └── index.js
│       │
│       ├── queues/
│       │   ├── clickQueue.js
│       │   └── clickWorker.js
│       │
│       ├── routes/
│       │   ├── link.routes.js
│       │   └── redirect.routes.js
│       │
│       ├── schemas/
│       │   └── link.schema.js
│       │
│       └── server.js
│
├── frontend/
│   ├── package.json
│   │
│   └── src/
│       ├── app/
│       │   ├── layout.js
│       │   ├── page.js
│       │   └── globals.css
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── LinkCard.jsx
│       │   ├── AnalyticsModal.jsx
│       │   └── CreateLinkForm.jsx
│       │
│       └── services/
│           └── api.js
│
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js v18 or higher
- npm
- Docker
- Docker Compose
- Git

---

### 1. Clone the Repository

Clone the repository using:

```bash
git clone https://github.com/vanshika-ai-ml/linkPulse.git
```

Navigate into the project:

```bash
cd linkpulse
```

---

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the required environment variables inside `.env`.

Example:

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

REDIS_URL=your_redis_url
```

> Never commit your actual `.env` file to GitHub.

---

### 3. Start PostgreSQL and Redis

The project provides Docker Compose configuration for the required services.

```bash
docker compose up -d
```

This starts the required PostgreSQL and Redis services.

---

### 4. Start the Backend

```bash
npm start
```

The backend API will be available at:

```text
http://localhost:5000
```

---

### 5. Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend dashboard will be available at:

```text
http://localhost:3000
```

---

## Key Features

### 🔗 Short URL Generation

Create short and shareable URLs from long original URLs.

### ✏️ Custom Short Codes

Users can optionally provide their own custom short code.

### ⚡ Fast URL Redirection

Redis caching allows frequently accessed short URLs to be resolved quickly.

### 📊 Click Analytics

Track the total number of clicks received by each shortened link.

### 🌐 Browser Analytics

Track the browsers used by visitors.

### 💻 Operating System Analytics

Track visitor operating systems.

### 🔎 Referrer Tracking

Identify the source from which visitors accessed the shortened URL.

### 🕒 Click History

View individual click events and their associated information.

### ⚙️ Asynchronous Processing

Click events are pushed into a BullMQ queue and processed in the background by a worker.

This keeps the redirect process fast and prevents analytics processing from blocking the user request.

### 🗑️ Link Management

Users can view, analyse, copy, and delete their shortened links.

### 🛡️ Input Validation

Incoming link data is validated using Zod before processing.

### 🚦 Rate Limiting

API endpoints are protected using `express-rate-limit`.

---

## How LinkPulse Works

### URL Creation

```text
User
  ↓
Next.js Dashboard
  ↓
Express API
  ↓
Zod Validation
  ↓
PostgreSQL
  ↓
Redis Cache
  ↓
Short URL Generated
```

---

### URL Redirection

```text
User clicks Short URL
        ↓
Express Redirect API
        ↓
Check Redis Cache
        ↓
Original URL Found
        ↓
Redirect User
```

---

### Click Analytics

```text
User Click
    ↓
Redirect Handler
    ↓
Collect Click Information
    ↓
BullMQ Queue
    ↓
Background Worker
    ↓
PostgreSQL
    ↓
Analytics Dashboard
```

---

## Analytics

For each shortened link, LinkPulse can provide:

- Total clicks
- Browser information
- Operating system information
- IP address
- Referrer
- Timestamp
- Individual click records

The dashboard also provides an analytics modal for inspecting link-specific statistics.

---

## API Overview

### Create Short Link

```http
POST /api/links
```

Creates a new shortened URL.

---

### Get All Links

```http
GET /api/links
```

Returns all created links along with their click counts.

---

### Get Link Analytics

```http
GET /api/links/:id/analytics
```

Returns detailed analytics for a specific link.

---

### Delete Link

```http
DELETE /api/links/:id
```

Deletes a shortened link and its associated analytics data.

---

### Redirect

```http
GET /:shortCode
```

Redirects the user from the shortened URL to the original URL.

---

## Database Design

LinkPulse uses PostgreSQL with Sequelize ORM.

### Link

Stores information about shortened URLs.

```text
Link
├── id
├── originalUrl
├── shortCode
├── title
└── createdAt
```

### Click

Stores information about individual visits.

```text
Click
├── id
├── linkId
├── ipAddress
├── browser
├── os
└── createdAt
```

### Relationship

```text
Link
  │
  └── hasMany
        │
        ▼
      Click
```

One link can have multiple click records.

---

## Performance

LinkPulse uses Redis caching and asynchronous click processing to improve redirect performance.

```text
Redis Cache
     ↓
Fast URL Lookup
     ↓
Instant Redirect
```

At the same time:

```text
Click Event
     ↓
BullMQ
     ↓
Background Worker
     ↓
PostgreSQL
```

This separates the critical redirect path from analytics processing.

---

## Security

The application includes:

- Zod request validation
- API rate limiting
- Environment variable configuration
- Redis-based caching
- Server-side validation
- Protected database configuration

Sensitive configuration values are stored in environment variables and should not be committed to the repository.

---

## Testing

The backend includes API testing support.

Run the backend test file using:

```bash
node test-api.js
```

---

## Future Improvements

- User authentication and authorization
- User-specific dashboards
- QR code generation
- Link expiration
- Password-protected links
- Advanced analytics charts
- Geographic analytics
- Export analytics reports
- Custom analytics date ranges
- Public API documentation

---

## Project Highlights

- Full-stack URL shortening application
- REST API architecture
- PostgreSQL database
- Sequelize ORM
- Redis caching
- BullMQ background workers
- Real-time analytics dashboard
- Dockerized development environment
- Input validation with Zod
- API rate limiting
- Next.js frontend

---

## Author

**Vanshika**

B.Tech CSE | 2024–2028

⭐ If you found this project useful, consider giving the repository a star.