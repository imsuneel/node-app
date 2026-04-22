require("dotenv").config();
const express = require("express");

const authRoutes = require("routes/auth.routes");
const userRoutes = require("routes/user.routes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});