// Movies Handler

import { Request, Response } from 'express';
import { Movie } from '../models/movies/movies.model';

export const getMovies = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const movies = await Movie.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  const { q } = req.query;

  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { production: { $regex: q, $options: 'i' } },
        { plot: { $regex: q, $options: 'i' } },
        { fullplot: { $regex: q, $options: 'i' } },
        { type: { $regex: q, $options: 'i' } },
        { languages: { $regex: q, $options: 'i' } },
        { genres: { $regex: q, $options: 'i' } },
        { cast: { $regex: q, $options: 'i' } },
        { directors: { $regex: q, $options: 'i' } },
        { writers: { $regex: q, $options: 'i' } },
      ],
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
