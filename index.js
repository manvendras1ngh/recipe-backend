import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";

import instantiateConnection from "./db/db.connect.js";
import recipeRoutes from "./routes/recipe.routes.js";

//server config
configDotenv({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 5175;

//db connection
try {
  instantiateConnection();
} catch (error) {
  throw error;
}

//server settings
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//user defined route
app.use("/api/v1/recipe", recipeRoutes);

//home route
app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});

//error route
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: "Internal server error!", error: error.message });
});

//active port
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
