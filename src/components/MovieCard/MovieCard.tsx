/* eslint-disable react/jsx-max-depth */
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ActorMoviesProps, DetailsProps,
  MovieDetailsProps, MovieProps } from '../../types';
import './style.css';
import { getCertainData } from '../../utils';

type MovieCardProps = {
  movie: MovieProps | MovieDetailsProps | ActorMoviesProps;
  character?: string;
  type?: string
};

export default function MovieCard({ movie, character = '', type = '' }: MovieCardProps) {
  const { i18n } = useTranslation();

  const [details, setDetails] = useState<DetailsProps>({} as DetailsProps);

  useEffect(() => {
    const getDetails = async () => {
      // eslint-disable-next-line max-len
      const images = await getCertainData(`movie/${movie.id}/images?include_image_language=${i18n.language},null`);
      const cast = await getCertainData(`movie/${movie.id}/credits`);

      setDetails({ images, cast });
    };
    getDetails();
  }, [movie.id]);

  const formatDate = (date: string) => {
    if (date) {
      return i18n.language
        ? format(new Date(date), 'dd/MM/yyyy')
        : format(new Date(date), 'MM/dd/yyyy');
    }
    return '';
  };

  const director = details?.cast?.crew
    ?.find((person) => person.job === 'Director')?.name;
  const poster = details?.images?.posters[0]?.file_path;
  // const logo = details?.images?.logos[0]?.file_path;

  const imageUrl = import.meta.env.VITE_IMG;

  return (
    <Link to={ `/movie/${movie.id}` } className="card">
      <div className="poster">
        <img src={ poster ? imageUrl + poster : imageUrl + movie.poster_path } alt="" />
      </div>
      <div className="details">
        <h2 className="title">{movie.title}</h2>
        {director && <h3>{`Directed by: ${director}`}</h3>}
        <div className="rating">
          {type === 'Upcoming' ? (
            <>
              <span className="stars">Release Date:</span>
              <span className="rate">{formatDate(movie.release_date)}</span>
            </>
          ) : (
            <>
              <span className="stars">Star Icons</span>
              <span className="rate">{movie.vote_average.toFixed(1)}</span>
            </>

          )}
        </div>
        <div className="tags">
          {/* AQUI SO RETORNA O ID DOS GENRES */}
          <span>Sci-fi</span>
          <span>Action</span>
        </div>
        <div className="info">
          <p>
            {movie.overview.split(' ').slice(0, 9).join(' ').replace(/,\s*$/, '')}
            ...
          </p>
        </div>
        <div className="cast">
          <h4>Cast</h4>
          <ul>
            {details.cast?.cast?.slice(0, 5).map((person) => (
              <li key={ person.id } title={ person.name }>
                <img
                  src={ person.profile_path
                    ? imageUrl + person.profile_path : '/anonym.png' }
                  alt="actor"
                />
              </li>
            ))}
          </ul>

        </div>
      </div>
      {character && <p>{character}</p>}
    </Link>
  );
}
