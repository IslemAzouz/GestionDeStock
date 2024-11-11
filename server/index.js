require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes"); 
const dashboard = require("./routes/dashboard");
const order = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/", dashboard);
app.use("/order", order);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is working correctly!');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to database!");

    // Drop the orderId_1 index from the Order collection
    try {
      await mongoose.connection.db.collection('orders').dropIndex('orderId_1');
      console.log("Index 'orderId_1' dropped successfully.");
    } catch (err) {
      console.error("Error dropping index:", err);
    }

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });
