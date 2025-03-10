const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');
const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

dbConnect();

const app = express();



//Middleware 

app.use(express.json());   
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRoutes);


//Start the server 
const PORT = process.env.PORT || 7002; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  