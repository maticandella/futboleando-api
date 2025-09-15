import express from "express";
import { refreshTodayMatches } from "./jobs/refresh-matches.job";
import matchesRoutes from './routes/matches.routes';

const PORT = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.use('/api/matches', matchesRoutes);

async function bootstrap() {
  await refreshTodayMatches();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
  });
}

bootstrap().catch(err => {
  console.error('❌ Error en bootstrap:', err);
  process.exit(1);
});