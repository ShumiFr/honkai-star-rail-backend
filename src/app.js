import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import charactersRoutes from "./routes/charactersRoutes.js";
import lightConesRoutes from "./routes/lightConesRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: ["https://hsr-builder.netlify.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
