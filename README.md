# NextBook Cloud - Accounting App

A modern full-stack accounting application built with React.js frontend and Node.js backend.

## Project Structure

```
accounting-app/
├── frontend/          # React.js frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js backend API
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
└── README.md
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5000

## Features

- Dashboard with financial overview
- Account management
- Transaction tracking
- Financial reports generation
- User authentication
- Responsive design

## Tech Stack

### Frontend
- React.js
- React Router
- TailwindCSS
- PostCSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/transactions` - Get transactions
- `POST /api/transactions` - Create transaction
- `GET /api/accounts` - Get accounts
- `GET /api/reports/profit-loss` - Profit & Loss report