const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dotEnv = require("dotenv");

const app = express();

//loading the env variables from .env file
dotEnv.config();

app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin:["http://localhost:5173","https://hacfy.com"], // Frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

// Use the auth routes for any /api/auth path
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
