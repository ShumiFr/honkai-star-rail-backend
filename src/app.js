import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import charactersRoutes from "./routes/charactersRoutes.js";
import lightConesRoutes from "./routes/lightConesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: "hsr-builder.netlify.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/honkaiStarRail")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/characters", charactersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/light-cones", lightConesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
