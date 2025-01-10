// Movies Model

import { Schema, model } from 'mongoose';
import { MovieData } from './movies.types';

const movieSchema = new Schema<MovieData>({
  title: { type: String, required: true },
  plot: { type: String, required: true },
  languages: {
    type: [String],
    required: true,
    default: ['English'],
  },
  poster: { type: String, required: true },
  fullplot: { type: String, required: true },
  countries: { type: [String], required: true },
  imdb: {
    rating: { type: Number, required: true },
    votes: { type: Number, required: true },
  },
  tomatoes: {
    viewer: {
      rating: { type: Number, required: true },
      numReviews: { type: Number, required: true },
      meter: { type: Number, required: true },
    },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    meter: { type: Number, required: true },
  },
  runtime: { type: Number, required: true },
  released: { type: Date, required: true },
  genres: { type: [String], required: true },
  directors: { type: [String], required: true },
  cast: { type: [String], required: true },
  writers: { type: [String], required: true },
  num_mflix_comments: { type: Number, required: true },
  type: { type: String, required: true },
});

export const Movie = model<MovieData>('movies', movieSchema);
