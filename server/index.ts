import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleEarlyAccess } from "./routes/early-access";

export function createServer() {
  const app = express();

  // On Netlify the /api/* redirect invokes this app at
  // /.netlify/functions/api/*. Normalize that back to /api/* so the routes
  // below match in production. Guarded by the prefix, so it is a no-op in dev
  // and anywhere the original /api/* path is already preserved.
  app.use((req, _res, next) => {
    const prefix = "/.netlify/functions/api";
    if (req.url.startsWith(prefix)) {
      req.url = "/api" + req.url.slice(prefix.length);
    }
    next();
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/early-access", handleEarlyAccess);

  return app;
}
