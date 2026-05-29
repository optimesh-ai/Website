// Local-only launcher: serves the built SPA (dist/spa) + the real API on Node 18.
// Avoids import.meta.dirname (Node 20+). Run: node_modules/.bin/tsx serve.local.mts
import path from "node:path";
import express from "express";
import { createServer } from "./server/index";

const app = createServer();
const distPath = path.resolve(process.cwd(), "dist/spa");

app.use(express.static(distPath));

app.use((req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    res.status(404).json({ error: "API endpoint not found" });
    return;
  }
  res.sendFile(path.join(distPath, "index.html"));
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Optimesh site serving on http://0.0.0.0:${port}  (dist: ${distPath})`);
});
