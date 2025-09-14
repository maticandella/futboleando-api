import express from "express";
import { refreshTodayMatches } from "./jobs/refresh-matches.job";

const PORT = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`API listening on http://localhost:${PORT}`);

  //TODO hacer endpoint para devolver lo cacheado
  const result = await refreshTodayMatches();
});