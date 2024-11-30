require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes"); 
const dashboard = require("./routes/dashboard");
const order = require("./routes/orderRoutes");
const salesRoutes = require('./routes/salesRoutes');
const stock =require("./routes/stockRoutes");


const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/", dashboard);
app.use("/order", order);
app.use('/sales', salesRoutes);
app.use('/stock',stock );



mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to database!");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });