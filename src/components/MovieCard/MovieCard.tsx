import { Link } from 'react-router-dom';
import { MovieProps } from '../../types';

type MovieCardProps = {
  movie: MovieProps;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = import.meta.env.VITE_IMG;
  return (
    <div>
      <Link to={ `/movie/${movie.id}` }>
        <img src={ imageUrl + movie.poster_path } alt="" style={ { maxWidth: 200 } } />
        <h1>{movie.title}</h1>
      </Link>
      <p>{movie.vote_average.toFixed(1)}</p>
    </div>
  );
}
