# NextBook Cloud API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:** Same as register

### Account Routes (Protected)

#### Get All Accounts
- **GET** `/accounts`
- **Query Parameters:**
  - None
- **Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "account_id",
      "name": "Cash Account",
      "type": "Asset",
      "balance": 50000,
      "description": "Primary cash account",
      "userId": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Account Summary
- **GET** `/accounts/summary`
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalAssets": 300000,
    "totalLiabilities": 50000,
    "totalEquity": 100000,
    "netWorth": 250000,
    "accountCount": 8
  }
}
```

#### Get Single Account
- **GET** `/accounts/:id`
- **Response:** Single account object

#### Create Account
- **POST** `/accounts`
- **Body:**
```json
{
  "name": "Bank Account - SBI",
  "type": "Asset",
  "balance": 250000,
  "description": "State Bank of India current account"
}
```
- **Response:** Created account object

#### Update Account
- **PUT** `/accounts/:id`
- **Body:** Same as create (all fields optional)
- **Response:** Updated account object

#### Delete Account
- **DELETE** `/accounts/:id`
- **Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

### Transaction Routes (Protected)

#### Get All Transactions
- **GET** `/transactions`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `type` (Income/Expense)
  - `category` (string)
  - `fromDate` (YYYY-MM-DD)
  - `toDate` (YYYY-MM-DD)
- **Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "transaction_id",
      "date": "2024-01-15T00:00:00.000Z",
      "description": "Office Rent Payment",
      "amount": -15000,
      "type": "Expense",
      "category": "Rent",
      "accountId": {
        "_id": "account_id",
        "name": "Cash Account",
        "type": "Asset"
      },
      "status": "Completed",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### Get Transaction Summary
- **GET** `/transactions/summary`
- **Query Parameters:**
  - `fromDate` (YYYY-MM-DD)
  - `toDate` (YYYY-MM-DD)
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalIncome": 100000,
    "totalExpense": 60000,
    "netAmount": 40000,
    "transactionCount": 25
  }
}
```

#### Create Transaction
- **POST** `/transactions`
- **Body:**
```json
{
  "date": "2024-01-15",
  "description": "Service Revenue from Client A",
  "amount": 35000,
  "type": "Income",
  "category": "Service",
  "accountId": "account_id",
  "status": "Completed",
  "reference": "INV-001"
}
```
- **Response:** Created transaction object

#### Update Transaction
- **PUT** `/transactions/:id`
- **Body:** Same as create (all fields optional)
- **Response:** Updated transaction object

#### Delete Transaction
- **DELETE** `/transactions/:id`
- **Response:**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

### Report Routes (Protected)

#### Dashboard Summary
- **GET** `/reports/dashboard`
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 125000,
    "totalExpenses": 85000,
    "netProfit": 40000,
    "pendingInvoices": 2,
    "accountBalances": {
      "cash": 50000,
      "bank": 250000,
      "totalAssets": 500000,
      "totalLiabilities": 100000
    },
    "recentTransactions": []
  }
}
```

#### Profit & Loss Report
- **GET** `/reports/profit-loss`
- **Query Parameters:**
  - `fromDate` (YYYY-MM-DD)
  - `toDate` (YYYY-MM-DD)
- **Response:**
```json
{
  "success": true,
  "reportType": "Profit & Loss",
  "data": {
    "period": {
      "from": "2024-01-01",
      "to": "2024-01-31"
    },
    "income": {
      "categories": {
        "Service": 75000,
        "Sales": 50000
      },
      "total": 125000
    },
    "expenses": {
      "categories": {
        "Rent": 15000,
        "Utilities": 5000
      },
      "total": 20000
    },
    "netIncome": 105000
  }
}
```

#### Balance Sheet Report
- **GET** `/reports/balance-sheet`
- **Response:**
```json
{
  "success": true,
  "reportType": "Balance Sheet",
  "data": {
    "asOfDate": "2024-01-31",
    "assets": {
      "categories": {
        "Asset": [
          {
            "name": "Cash Account",
            "balance": 50000
          }
        ]
      },
      "total": 300000
    },
    "liabilities": {
      "categories": {},
      "total": 50000
    },
    "equity": {
      "categories": {},
      "total": 100000
    },
    "totalLiabilitiesAndEquity": 150000
  }
}
```

#### Cash Flow Report
- **GET** `/reports/cash-flow`
- **Query Parameters:**
  - `fromDate` (YYYY-MM-DD)
  - `toDate` (YYYY-MM-DD)
- **Response:**
```json
{
  "success": true,
  "reportType": "Cash Flow",
  "data": {
    "period": {
      "from": "2024-01-01",
      "to": "2024-01-31"
    },
    "operatingActivities": {
      "cashInflows": 125000,
      "cashOutflows": 85000,
      "netCashFlow": 40000
    },
    "summary": {
      "beginningBalance": 0,
      "totalInflows": 125000,
      "totalOutflows": 85000,
      "endingBalance": 40000
    }
  }
}
```

#### Trial Balance Report
- **GET** `/reports/trial-balance`
- **Response:**
```json
{
  "success": true,
  "reportType": "Trial Balance",
  "data": {
    "asOfDate": "2024-01-31",
    "accounts": [
      {
        "name": "Cash Account",
        "type": "Asset",
        "debit": 50000,
        "credit": 0
      }
    ],
    "totals": {
      "debit": 300000,
      "credit": 300000
    }
  }
}
```

## Error Responses

### Validation Errors (400)
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### Authentication Errors (401)
```json
{
  "message": "No token, authorization denied"
}
```

### Not Found Errors (404)
```json
{
  "message": "Account not found"
}
```

### Server Errors (500)
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

## Account Types
- **Asset**: Cash, Bank Accounts, Inventory, Equipment
- **Liability**: Loans, Accounts Payable, Credit Cards
- **Equity**: Owner's Equity, Retained Earnings
- **Revenue**: Sales, Service Income, Interest Income
- **Expense**: Rent, Utilities, Salaries, Marketing

## Transaction Types
- **Income**: Positive amounts, increases account balance
- **Expense**: Negative amounts, decreases account balance

## Status Values
- **Completed**: Transaction is finalized
- **Pending**: Transaction is awaiting confirmation

## Notes
- All monetary amounts are in the base currency (₹ for Indian Rupees)
- Dates should be in ISO format (YYYY-MM-DD)
- All timestamps are in UTC
- Account balances are automatically updated when transactions are created/updated/deleted
- Soft delete is used for accounts (isActive: false)