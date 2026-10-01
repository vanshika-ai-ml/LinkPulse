# LinkPulse – Frontend

LinkPulse is a modern URL shortening and link analytics application. The frontend provides an easy-to-use interface for creating short links and viewing their performance.

## 🚀 Features

- Create short URLs from long URLs
- Copy generated short links
- View shortened links
- Track link clicks
- View analytics for shortened URLs
- Display total clicks
- Responsive and user-friendly interface
- Backend API integration

## 🛠️ Tech Stack

- Next.js
- React.js
- JavaScript
- CSS
- REST API
- Node.js backend

## 📂 Project Structure

```text
frontend/
├── app/
├── components/
├── public/
├── package.json
├── next.config.js
└── README.md
```

## ⚙️ Installation

Clone the repository:

    git clone <https://github.com/vanshika-ai-ml/LinkPulse.git>

Navigate to the frontend folder:

    cd frontend

Install dependencies:

    npm install

## ▶️ Run the Application

Start the development server:

    npm run dev

The application will run on:

    http://localhost:3000

## 🔗 Backend Connection

The frontend communicates with the LinkPulse backend API for:

- URL shortening
- Redirect handling
- Click tracking
- Analytics
- Link management

Make sure the backend server is running before using API-dependent features.

## 📊 Analytics

LinkPulse provides analytics for shortened URLs, including:

- Total clicks
- Click information
- Link performance

The analytics interface allows users to monitor the performance of their shortened links.

## 🔐 Environment Variables

If required, create a `.env.local` file:

    NEXT_PUBLIC_API_URL=http://localhost:5000

Use the appropriate backend URL when deploying the application.

## 🌐 Deployment

The frontend can be deployed using platforms such as Vercel.

Build the application using:

    npm run build

## 👩‍💻 Author

Vanshika

## 📌 Project

**LinkPulse – URL Shortener & Link Analytics**