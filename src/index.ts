import express from "express";
import { getMatches } from "./services/match.service";

const PORT = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});