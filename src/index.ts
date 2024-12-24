import { clerkMiddleware, requireAuth } from '@clerk/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response, Router } from 'express';
import db from './configs/db';
import { rateLimiter } from './middlewares/common/rate-limiter';
import movieRoutes from './routers/movies.router';
import userRoutes from './routers/users.router';

type TempEvent = {
  type: string;
  data: unknown;
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

setupMiddleware();

app.get('/', (_: Request, res: Response) => {
  res.status(403).send('Access Denied!');
});

app.listen(port, () => {
  console.log(`[server]: Server is up & running`);
  db.on('error', console.error.bind(console, 'db connection error:'));
  db.once('open', () => console.log('Database Connected successfully'));
});

function setupMiddleware() {
  // Body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CORS
  setupCors();

  // Clerk
  app.use(
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
      secretKey: process.env.CLERK_SECRET_KEY!,
      debug: true,
    }),
  );

  app.use(rateLimiter);

  // Router
  setupRouter();
}

function setupRouter() {
  const router = Router();

  router.use('/movies', movieRoutes);
  router.use('/users', requireAuth(), userRoutes);
  app.use('/api', router);
}

function setupCors() {
  var whitelist = ['http://localhost'];
  app.use(
    cors({
      origin: function (url = '', callback) {
        if (whitelist.indexOf(url) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    }),
  );
}
