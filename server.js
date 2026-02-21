const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* =======================
   INIT APP
======================= */
const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* 🔥 IMPORTANT: Increase body limit */
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

/* =======================
   IMPORT ROUTES
======================= */
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const heroRoutes = require("./routes/heroRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const skillRoutes = require("./routes/skillRoutes");

const experienceRoutes = require("./routes/experienceRoutes");
const publicExperienceRoutes = require("./routes/publicExperienceRoutes");

const projectRoutes = require("./routes/projectRoutes");
const publicProjectRoutes = require("./routes/publicProjectRoutes");
const projectCategoryRoutes = require("./routes/projectCategoryRoutes");

const serviceRoutes = require("./routes/serviceRoutes");
const publicServiceRoutes = require("./routes/publicServiceRoutes");

const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");

/* =======================
   ROUTES
======================= */

app.use("/api/auth", authRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/hero", heroRoutes);

app.use("/api/admin/about", aboutRoutes);
app.use("/api/about", aboutRoutes);

app.use("/api/admin/settings", settingsRoutes);

app.use("/api/admin/skills", skillRoutes);
app.use("/api/skills", skillRoutes);

app.use("/api/admin/experience", experienceRoutes);
app.use("/api/experience", publicExperienceRoutes);

app.use("/api/admin/projects", projectRoutes);
app.use("/api/projects", publicProjectRoutes);

app.use("/api/admin/project-categories", projectCategoryRoutes);

app.use("/api/admin/services", serviceRoutes);
app.use("/api/services", publicServiceRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/admin/blogs", blogRoutes);
app.use("/api/blogs", blogRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).send("Backend API is running 🚀");
});

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  if (err.code === "ECONNRESET") {
    console.log("⚠️ Request aborted by client");
    return res.status(400).json({ message: "Request aborted" });
  }

  console.error("🔥 GLOBAL ERROR:", err);
  res.status(err.http_code || 500).json({
    message: err.message || "Server Error",
  });
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});