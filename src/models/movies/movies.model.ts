// Movies Model

import { Schema, model } from 'mongoose';
import { MovieData } from './movies.types';

const movieSchema = new Schema<MovieData>({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  languages: {
    type: [
      {
        code: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    required: true,
    default: [
      {
        code: 'en_US',
        name: 'English',
      },
    ],
  },
  posterPath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  rating: { type: Number, required: true },
  ratedBy: { type: Number, required: true },
  likeCount: { type: Number, required: true, default: 0 },
  runtime: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  genres: { type: [String], required: true },
  director: { type: String, required: true },
  casts: { type: [String], required: true },
  date: { type: Date, default: Date.now },
});

export const Movie = model<MovieData>('Movie', movieSchema);
