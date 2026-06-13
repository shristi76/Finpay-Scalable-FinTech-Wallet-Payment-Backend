require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Transaction = require('./src/models/Transaction');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected for Seeding...');

    await User.deleteMany();
    await Transaction.deleteMany();
    console.log('Existing users & transactions deleted.');

    // Default password and mpin
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);
    // Let's seed an MPIN "1234" for easy testing
    const mpin = await bcrypt.hash('1234', salt);

    const usersToCreate = [
      { name: 'Amit Sharma', email: 'amit@example.com', phone: '9876543210', upiId: 'amit123@phonepe', password, mpin, balance: 5000 },
      { name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', upiId: 'priya456@phonepe', password, mpin, balance: 3000 },
      { name: 'Rahul Verma', email: 'rahul@example.com', phone: '9876543212', upiId: 'rahul789@phonepe', password, mpin, balance: 1500 },
      { name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543213', upiId: 'neha012@phonepe', password, mpin, balance: 8000 },
    ];

    await User.insertMany(usersToCreate);
    console.log('Seed Users Imported Successfully!');
    console.log('All Users have default password: password123 | default MPIN: 1234');
    
    process.exit();
  } catch (error) {
    console.error(`Error with Seeding: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();