export type MoviesArrayProps = {
  popular: MovieProps[];
};

export type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type HomeMoviesProps = {
  popular: MovieProps[];
  trending: MovieProps[];
  upcoming: MovieProps[];
  topRated: MovieProps[];
  recentlyMovies: MovieProps[];
};

export type GenreProps = {
  id: number;
  name: string;
};

export type MovieDetailsProps = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | unknown;
  budget: number;
  genres: GenreProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: unknown[];
  production_countries: unknown[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: unknown[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ProvidersProps = {
  link?: string;
  rent?: TypesProps[];
  buy?: TypesProps[];
  flatrate?: TypesProps[];
};

export type TypesProps = {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
};

export type UserTypes = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};
