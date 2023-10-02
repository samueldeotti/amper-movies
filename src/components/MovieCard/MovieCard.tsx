import { Link } from 'react-router-dom';
import { ActorMoviesProps, MovieDetailsProps, MovieProps } from '../../types';
import { formattedDate } from '../../utils';

type MovieCardProps = {
  movie: MovieProps | MovieDetailsProps | ActorMoviesProps;
  character?: string;
  type?: string
};

export default function MovieCard({ movie, character = '', type = '' }: MovieCardProps) {
  const imageUrl = import.meta.env.VITE_IMG;
  return (
    <div>
      <Link to={ `/movie/${movie.id}` }>
        <img src={ imageUrl + movie.poster_path } alt="" style={ { maxWidth: 200 } } />
        <h1>{movie.title}</h1>
      </Link>
      <p>
        {type === 'Upcoming'
          ? formattedDate(movie.release_date) : movie.vote_average.toFixed(1)}
      </p>
      {character && <p>{character}</p>}
    </div>
  );
}
