import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  app.use(cookieParser());
  app.use(express.json());
  app.use(router);

  const PORT = process.env.PORT || 3001;

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      throw err;
    }
  });
})();
