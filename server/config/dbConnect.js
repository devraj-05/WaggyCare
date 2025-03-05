const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
       const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database has been connected successfully to ${connect.connection.host}, ${connect.connection.name}`);  
    } catch (error) {
        console.log('Error connecting to database:', error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;