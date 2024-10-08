const mongoose = require('mongoose');
require('dotenv').config();
const MAX_RETRIES = 5; // Set a limit for maximum retry attempts
let retries = 0;
console.log('env',process.env.MONGO_URI)
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected:', connect.connection.host);
  } catch (err) {
    retries++;
    console.log(`Error connecting to MongoDB: ${err.message}. Retrying in 3 seconds... (Attempt ${retries}/${MAX_RETRIES})`);

    if (retries < MAX_RETRIES) {
      setTimeout(connectDb, 3000); // Retry connection after 3 seconds
    } else {
      console.log('Max retry attempts reached. Exiting...');
      process.exit(1);  //terminate a Node.js process due to an Error, if it's 0 exit after succesful completion
    }
  }
};

module.exports = connectDb;
