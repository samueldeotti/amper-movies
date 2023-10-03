import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ActorMoviesProps, MovieDetailsProps, MovieProps } from '../../types';

type MovieCardProps = {
  movie: MovieProps | MovieDetailsProps | ActorMoviesProps;
  character?: string;
  type?: string
};

export default function MovieCard({ movie, character = '', type = '' }: MovieCardProps) {
  const { i18n } = useTranslation();

  const formatDate = (date: string) => {
    if (date) {
      return i18n.language
        ? format(new Date(date), 'dd/MM/yyyy')
        : format(new Date(date), 'MM/dd/yyyy');
    }
    return '';
  };

  const imageUrl = import.meta.env.VITE_IMG;
  return (
    <div>
      <Link to={ `/movie/${movie.id}` }>
        <img src={ imageUrl + movie.poster_path } alt="" style={ { maxWidth: 200 } } />
        <h1>{movie.title}</h1>
      </Link>
      <p>
        {type === 'Upcoming'
          ? formatDate(movie.release_date) : movie.vote_average.toFixed(1)}
      </p>
      {character && <p>{character}</p>}
    </div>
  );
}
