const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dotEnv = require("dotenv");
const app = express();
dotEnv.config();

const agenda = require('./agenda'); 
require('./jobs/job')(agenda)

app.use(express.json());

app.use(
  cors({
    origin:["http://localhost:5173","https://hacfy.com"], // Frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
agenda.start(); 
console.log('Agenda started!');


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
