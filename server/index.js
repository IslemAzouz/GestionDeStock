
require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes"); //testtest
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
app.use(express.urlencoded({extended: false}));
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });

//test