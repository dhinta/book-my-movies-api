// Movies Router

import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from '../handlers/movies.handler';

const router = Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
