/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { MovieDetailsProps, MovieProps, UserInfoMovie, VideoProps } from '../../types';
import { addRating,
  customStyles, getCertainData, handleLoggedMovies } from '../../utils';
import ProvidersCard from '../../components/ProvidersCard/ProvidersCard';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import MediaButtons from '../../components/MediaButtons/MediaButtons';
import FavButtons from '../../components/FavButtons/FavButtons';

export default function Movie() {
  const [movie, setMovie] = useState<MovieDetailsProps>({} as MovieDetailsProps);
  const [userMovieInfo, setUserMovieInfo] = useState({} as UserInfoMovie);
  const [rating, setRating] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMG;
  let savedUser = JSON.parse(localStorage.getItem('user') as string) || {};

  useEffect(() => {
    const getData = async () => {
      // eslint-disable-next-line max-len
      const data = await getCertainData(`movie/${id}?append_to_response=videos,credits,recommendations,similar,account_states,watch/providers,images&include_image_language=${i18n.language},null`);

      const seenRecently = JSON.parse(localStorage.getItem('seenRecently') || '[]');
      if (!seenRecently.includes(data.id)) {
        localStorage.setItem('seenRecently', JSON.stringify([...seenRecently, data.id]));
      }
      if (savedUser.id) setUserMovieInfo(data.account_states);
      setMovie(data);
    };
    getData();
  }, [i18n.language, id, savedUser.id, userMovieInfo]);

  const {
    genres,
    homepage,
    overview,
    poster_path,
    release_date,
    runtime,
    tagline,
    title,
    vote_average,
    credits,
    similar,
  } = movie;

  let { recommendations, videos, images } = movie;
  recommendations = (recommendations?.results.length > 10
    ? recommendations?.results : similar?.results)
    ?.filter((rec: MovieProps) => rec.backdrop_path
    && rec.poster_path && rec.overview && rec.title);

  videos = [videos?.results].flat() as VideoProps[];
  images = [images?.backdrops, images?.posters.slice(0, 10)].flat();

  const providers = savedUser.id
    ? movie['watch/providers']?.results[savedUser.iso_3166_1]
    : movie['watch/providers']?.results[i18n.language === 'en' ? 'US' : 'BR'];

  const hoursWatch = Math.floor(+runtime / 60);
  const minutesWath = +runtime % 60;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogged = async (type?: 'favorite' | 'watchlist') => {
    savedUser = JSON.parse(localStorage.getItem('user') as string) || {} as any;
    if (savedUser.id) {
      await (type
        ? handleLoggedMovies(id as string, savedUser.id, !userMovieInfo[type], type)
        : addRating(id as string, rating)
      );
    } else {
      const data = await getCertainData('https://api.themoviedb.org/3/authentication/token/new');
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://ampermovies.surge.sh/movie/${id}`;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogged();
    closeModal();
  };

  let formattedDate = '';
  if (release_date) {
    formattedDate = i18n.language
      ? format(new Date(release_date), 'dd/MM/yyyy')
      : format(new Date(release_date), 'MM/dd/yyyy');
  }

  const searchTrailer = () => {
    const trailer = videos
      ?.find(({ name, official }: VideoProps) => name === 'Main Trailer' && official);
    if (trailer) return trailer;
    return videos?.find(({ type }: VideoProps) => type === 'Trailer');
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!movie.id ? <p>Loading...</p>
        : (
          <div>
            <h2>{title}</h2>
            <p>{tagline}</p>
            <div style={ { display: 'flex', justifyContent: 'center' } }>
              <div>
                <p>{ t('movie.tmdb') }</p>
                <p>
                  {vote_average > +0
                    ? Number(vote_average).toFixed(1) : t('movie.released')}
                </p>
              </div>
              <FavButtons
                textCondition={ userMovieInfo.rated }
                typeButton="rate"
                modal={ openModal }
              />
              <FavButtons
                typeButton="favorite"
                textCondition={ userMovieInfo.favorite }
                handleLogged={ () => handleLogged('favorite') }
              />
              <FavButtons
                typeButton="watchlist"
                textCondition={ userMovieInfo.watchlist }
                handleLogged={ () => handleLogged('watchlist') }
              />
            </div>
            <img src={ imageUrl + poster_path } alt="" />
            { searchTrailer() ? <iframe width="560" height="315" src={ `https://www.youtube.com/embed/${searchTrailer()?.key}` } title="YouTube video player" frameBorder="0" allow="encrypted-media; gyroscope; picture-in-picture; web-share" /> : <div><p>No Trailer Found</p></div>}
            <MediaButtons videos={ videos } images={ images } />
            <p>
              {vote_average > +0
                ? release_date?.split('-')[0]
                : `${t('movie.releaseDate')} ${formattedDate}`}
            </p>
            <p>
              {minutesWath && hoursWatch
                ? `${t('movie.duration')} ${hoursWatch}h ${minutesWath}m`
                : t('movie.notInformed')}
            </p>
            <div>
              <p>{t('movie.genres')}</p>
              <ul>
                {genres?.slice(0, 3)?.map(({ name }) => <li key={ name }>{name}</li>)}
              </ul>
            </div>
            <p>{overview}</p>
            {!!credits.cast.length && (
              <div>
                <Link to={ `/credits.cast/${movie.id}` }>{t('movie.seeFullCast')}</Link>
                <MovieCarousel
                  movies={ credits.cast?.slice(0, 12) }
                  text={ t('movie.cast') }
                />
              </div>)}
            {homepage
            && (
              <p>
                {t('movie.learnMore')}
                <a href={ homepage } target="_blanck">{` ${title}`}</a>
              </p>)}
            <div>
              <p>{t('movie.whereWatch')}</p>
              { !providers ? <p>{t('movie.noServicesFound')}</p>
                : (<ProvidersCard providers={ providers } />)}
            </div>
            {!!recommendations?.length && (
              <div>
                <p>{t('movie.similars')}</p>
                <MovieCarousel
                  movies={ recommendations?.slice(0, 12) }
                  text={ t('movie.moreLikeThis') }
                />
              </div>
            )}
            <Modal
              isOpen={ isOpen }
              onRequestClose={ closeModal }
              style={ customStyles }
              contentLabel="Rate Modal"
              ariaHideApp={ false }
            >
              <div>
                <p>{t('movie.rateThis')}</p>
                <p>{title}</p>
              </div>
              <button onClick={ closeModal }>X</button>
              <form onSubmit={ handleSubmit }>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={ rating }
                  onChange={ ({ target }) => setRating(+target.value) }
                />
                <button type="submit">{t('movie.rate.rateText')}</button>
              </form>
            </Modal>
          </div>
        )}

    </>
  );
}
