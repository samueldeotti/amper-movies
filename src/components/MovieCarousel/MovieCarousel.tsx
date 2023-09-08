import MovieCard from '../MovieCard/MovieCard';
import { MovieProps } from '../../types';

type MovieCardProps = {
  movies: MovieProps[];
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
