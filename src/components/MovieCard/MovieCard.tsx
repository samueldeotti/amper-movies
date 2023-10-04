/* eslint-disable react/jsx-max-depth */
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ActorMoviesProps, MovieDetailsProps, MovieProps } from '../../types';
import './style.css';

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
    <div className="card">
      <Link to={ `/movie/${movie.id}` } className="poster">
        <img src={ imageUrl + movie.poster_path } alt="" />
        <h1>{movie.title}</h1>
      </Link>
      <div className="details">
        <h2>{movie.title}</h2>
        <h3>Directed by: Joao Paulo</h3>
        <div className="rating">
          <span className="stars">Star Icons</span>
          <span className="rate">
            {type === 'Upcoming'
              ? formatDate(movie.release_date) : movie.vote_average.toFixed(1)}
          </span>
        </div>
        <div className="tags">
          {/* AQUI SO RETORNA O ID DOS GENRES */}
          <span>Sci-fi</span>
          <span>Action</span>
        </div>
        <div className="info">
          <p>
            {movie.overview.split(' ').slice(0, 10).join(' ').replace(/,\s*$/, '')}
            ...
          </p>
        </div>
        <div className="cast">
          <h4>Cast</h4>
          <ul>
            <li><img src="/anonym.png" alt="" /></li>
            <li><img src="/anonym.png" alt="" /></li>
            <li><img src="/anonym.png" alt="" /></li>
            <li><img src="/anonym.png" alt="" /></li>
            <li><img src="/anonym.png" alt="" /></li>
          </ul>

        </div>
      </div>
      {character && <p>{character}</p>}
    </div>
  );
}
