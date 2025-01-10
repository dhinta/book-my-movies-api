import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response, Router } from 'express';
import db from './configs/db';
import { rateLimiter } from './middlewares/common/rate-limiter';
import movieRoutes from './routers/movies.router';
import userRoutes from './routers/users.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (_: Request, res: Response) => {
  res.status(403).send('Access Denied!');
});

setupMiddleware();

app.listen(port, () => {
  console.log(`[server]: Server is up & running`);
  db.on('error', console.error.bind(console, 'db connection error:'));
  db.once('open', () => console.log('Database Connected successfully'));
});

process.on('SIGINT', () => {
  console.log('Shutting down server');
  db.close();
  process.exit(0);
});

function setupMiddleware() {
  // Body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CORS
  app.use(cors());

  app.use(rateLimiter);

  // Router
  setupRouter();
}

function setupRouter() {
  const router = Router();

  router.use('/movies', movieRoutes);
  router.use('/users', userRoutes);
  app.use('/api', router);
}
