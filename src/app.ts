
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import v1Routes from './routes/v1';
import { setupSwagger } from './utils/swagger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

setupSwagger(app);

app.use('/api/v1', v1Routes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenue sur l\'API de la bibliothèque', version: '1.0.0', documentation: '/api-docs' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route non trouvée' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: process.env.NODE_ENV === 'production' ? 'Erreur serveur' : err.message });
});

export default app;