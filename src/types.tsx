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
  name?: string;
  first_air_date?: string;
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

export type VideoProps = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name?: string;
  official: boolean;
  site: string;
  size: number;
  type: string;
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
  media_type?: string;
  videos: { results: VideoProps[] };
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

export type CastProps = {
  cast: CastDetailsProps[];
  crew: CrewDetailsProps[];
  id: number;
};

export type CastDetailsProps = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path?: string;
  title?: string;
};

export type CrewDetailsProps = {
  adult: boolean;
  credit_id: number;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
};

export type PersonProps = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: null | string;
  gender: number;
  homepage: null | string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
};

export type ActorMoviesProps = {
  adult: boolean;
  backdrop_path: string | null;
  character: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  order: number;
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
  known_for: MovieProps[];
  profile_path: string;
  known_for_department: string;
  name: string;
};

export type ImageDetailsProps = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ImagesProps = {
  backdrops: ImageDetailsProps[];
  logos: ImageDetailsProps[];
  id: number;
  posters: ImageDetailsProps[];
};

export type UserInfoMovie = {
  id: number;
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
};

export type DetailsProps = {
  images: ImagesProps;
  cast: CastProps;
};
