import app from "./app";
import { connectDB } from "./config/db";
import "./config/env.init";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.get("/api/health", (req, res) => {
    res.send("Welcome to Template Express API!");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
