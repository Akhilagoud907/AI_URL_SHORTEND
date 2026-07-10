const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const linkRoutes = require("./routes/link.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/links", linkRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI URL Shortener API is running 🚀",
  });
});

module.exports = app;