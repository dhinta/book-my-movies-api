// Movies Router

import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  searchMovies,
  updateMovie,
} from '../handlers/movies.handler';

const router = Router();

router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
