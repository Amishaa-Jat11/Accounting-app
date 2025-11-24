const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const clearData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Account.deleteMany({});
    await Transaction.deleteMany({});

    console.log('✅ Database cleared successfully!');
    console.log('All dummy data has been removed.');
    
    process.exit(0);
  } catch (error) {
    console.error('Clearing error:', error.message);
    process.exit(1);
  }
};

const runClear = async () => {
  await connectDB();
  await clearData();
};

runClear();