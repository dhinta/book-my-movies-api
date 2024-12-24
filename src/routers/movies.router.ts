// Movies Router

import { clerkClient, getAuth, requireAuth } from '@clerk/express';
import { NextFunction, Request, Response, Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from '../handlers/movies.handler';

const router = Router();

const hasPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = getAuth(req);

  if (!auth || !auth.userId) {
    res.status(403).json({ error: 'Access Denied!' });
    return;
  }

  const user = await clerkClient.users.getUser(auth.userId!);
  console.log(user);
  if (!auth.has({ permission: 'org:movies:manage' })) {
    res.status(403).json({ error: 'Access Denied!' });
    return;
  }

  return next();
};

// app.get('/path', requireAuth(), hasPermission, (req, res) => res.json(req.auth))

router.get('/', hasPermission, getMovies);
router.post('/', requireAuth(), hasPermission, createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
