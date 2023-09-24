import MovieCard from '../MovieCard/MovieCard';
import { MovieDetailsProps, MovieProps } from '../../types';

type MovieCardProps = {
  movies: MovieProps[] | MovieDetailsProps[];
  text: string
};

export default function MovieCarousel({ movies, text }: MovieCardProps) {
  return (
    <div style={ { display: 'flex' } }>
      <p>{text}</p>
      {movies.map((movie) => <MovieCard key={ movie.id } movie={ movie } />)}
    </div>
  );
}
