/* eslint-disable react/jsx-max-depth */
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
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
      const { images, credits, genres } = await getCertainData(`movie/${movie.id}?append_to_response=credits,images&include_image_language=${i18n.language},null`);
      setDetails({ images, credits, genres });
    };
    getDetails();
  }, [movie.id]);

  console.log(details);

  const formatDate = (date: string) => {
    if (date) {
      return i18n.language
        ? format(new Date(date), 'dd/MM/yyyy')
        : format(new Date(date), 'MM/dd/yyyy');
    }
    return '';
  };

  const director = details?.credits?.crew
    ?.find((person) => person.job === 'Director')?.name;
  const poster = details?.images?.posters[0]?.file_path;

  const imageUrl = import.meta.env.VITE_IMG;

  return (
    <Link to={ `/movie/${movie.id}` } className="card" style={ { userSelect: 'none' } }>
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
              <div className="starRating">
                <span className="stars"><FiStar className="teste" /></span>
                <span className="stars"><FiStar className="teste" /></span>
                <span className="stars"><FiStar className="teste" /></span>
                <span className="stars"><FiStar className="teste" /></span>
                <span className="stars"><FiStar className="teste" /></span>
              </div>
              {/* <meter min="1" max="10" value={ movie.vote_average.toFixed(1) } /> */}
              <span className="rate">{movie.vote_average.toFixed(1)}</span>
            </>

          )}
        </div>
        {details.genres
        && (
          <div className="tags">
            <span>{details?.genres[0]?.name}</span>
            {details?.genres[1]?.name && <span>{details?.genres[1]?.name}</span>}
          </div>)}
        <div className="info">
          <p>
            {movie.overview.split(' ').slice(0, 9).join(' ').replace(/,\s*$/, '')}
            ...
          </p>
        </div>
        <div className="cast">
          <h4>Cast</h4>
          <ul>
            {details.credits?.cast?.slice(0, 5).map((person) => (
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

// const logo = details?.images?.logos[0]?.file_path;
/* {logo ? <img
  className="logo"
          src={ imageUrl.replace('w500', 'w185') + logo }
          alt=""
        /> : <h2 className="title">{movie.title}</h2>} */
