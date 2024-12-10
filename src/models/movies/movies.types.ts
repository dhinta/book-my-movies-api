interface Language {
  code: string;
  name: string;
}

export interface MovieData {
  title: string;
  overview: string;
  languages: Language[];
  posterPath: string;
  thumbnailPath: string;
  rating: number;
  ratedBy: number;
  likeCount: number;
  releaseDate: Date;
  genres: string[];
  director: string;
  casts: string[];
  runtime: number;
  date: Date;
}
