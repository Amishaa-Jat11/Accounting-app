# NextBook Cloud Backend API

A comprehensive accounting application backend built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Account Management**: Create, read, update, delete business accounts
- **Transaction Management**: Full CRUD operations for financial transactions
- **Financial Reports**: Generate P&L, Balance Sheet, Cash Flow, and Trial Balance reports
- **Dashboard Analytics**: Real-time business metrics and summaries
- **Data Validation**: Input validation using express-validator
- **Security**: Protected routes with JWT middleware

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Accounts (Protected)
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/summary` - Get account summary
- `GET /api/accounts/:id` - Get single account
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

### Transactions (Protected)
- `GET /api/transactions` - Get all transactions (with pagination and filters)
- `GET /api/transactions/summary` - Get transaction summary
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reports (Protected)
- `GET /api/reports/dashboard` - Get dashboard summary
- `GET /api/reports/profit-loss` - Generate Profit & Loss report
- `GET /api/reports/balance-sheet` - Generate Balance Sheet report
- `GET /api/reports/cash-flow` - Generate Cash Flow report
- `GET /api/reports/trial-balance` - Generate Trial Balance report

## Database Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- timestamps

### Account
- name (String, required)
- type (Enum: Asset, Liability, Equity, Revenue, Expense)
- balance (Number, default: 0)
- description (String)
- userId (ObjectId, ref: User)
- isActive (Boolean, default: true)
- timestamps

### Transaction
- date (Date, required)
- description (String, required)
- amount (Number, required)
- type (Enum: Income, Expense)
- category (String, required)
- accountId (ObjectId, ref: Account)
- userId (ObjectId, ref: User)
- status (Enum: Pending, Completed)
- reference (String)
- timestamps

## Sample Data

After running `npm run seed`, you can use these credentials:
- **Email**: demo@nextbook.com
- **Password**: password123

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## Error Handling

The API includes comprehensive error handling:
- Input validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes middleware
- Input validation and sanitization
- CORS enabled for cross-origin requests

## Business Logic

- **Account Balance Management**: Automatically updates account balances when transactions are created, updated, or deleted
- **Soft Delete**: Accounts are soft-deleted (isActive: false) to maintain data integrity
- **Transaction Types**: Income transactions increase balance, Expense transactions decrease balance
- **Report Generation**: Real-time calculation of financial reports based on current data

## Development

For development, use:
```bash
npm run dev
```

This starts the server with nodemon for automatic restarts on file changes.

## Production Deployment

1. Set NODE_ENV=production in your environment
2. Use a production MongoDB database
3. Set secure JWT_SECRET
4. Run: `npm start`

## API Documentation

Detailed API documentation is available in `API_DOCUMENTATION.md`