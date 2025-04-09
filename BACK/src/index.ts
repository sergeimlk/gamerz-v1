import express from "express";
import cors from "cors";
import routes from "./routes/routes"; // Import the main router
import connectDB from "./db";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", routes); // Mount all routes under /api

const PORT = process.env.SERVER_PORT || 8080;

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("[server] Failed to start server:", error);
    process.exit(1);
  });
