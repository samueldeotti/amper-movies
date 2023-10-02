/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { CastDetailsProps,
  MovieDetailsProps,
  ProvidersProps, ImageDetailsProps, UserInfoMovie } from '../../types';
import { addRating,
  customStyles, formattedDate, getCertainData, handleLoggedMovies } from '../../utils';
import ProvidersCard from '../../components/ProvidersCard/ProvidersCard';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import MediaButtons from '../../components/MediaButtons/MediaButtons';

export default function Movie() {
  const [infoMovie, setMovieInfo] = useState({
    movie: {} as MovieDetailsProps,
    providers: {} as ProvidersProps,
    similars: [] as MovieDetailsProps[],
    cast: [] as CastDetailsProps[],
    images: [] as ImageDetailsProps[],
  });
  const [userMovieInfo, setUserMovieInfo] = useState({} as UserInfoMovie);
  const [rating, setRating] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMG;

  useEffect(() => {
    const getData = async () => {
      const data = await getCertainData(`movie/${id}?append_to_response=videos`);
      const seenRecently = JSON.parse(localStorage.getItem('seenRecently') || '[]');
      if (!seenRecently.includes(data.id)) {
        localStorage.setItem('seenRecently', JSON
          .stringify([...seenRecently, data.id]));
      }

      const savedUser = JSON.parse(localStorage.getItem('user') as string) || {};
      if (savedUser.id) {
        const userInfo = await getCertainData(`movie/${id}/account_states`);
        setUserMovieInfo(userInfo);
      }
      const providersData = await getCertainData(`movie/${id}/watch/providers`);
      const similarData = await getCertainData(`movie/${id}/similar`);
      const castData = await getCertainData(`movie/${id}/credits`);
      const imagesData = await getCertainData(`movie/${id}/images?
      &include_image_language=en,null`);
      const { backdrops, logos, posters } = imagesData;

      console.log(navigator.languages);

      setMovieInfo({
        movie: data,
        providers: savedUser.id
          ? providersData.results[savedUser.iso_3166_1]
          : providersData.results[navigator.languages[0].split('-')[1]],
        similars: similarData,
        cast: castData.cast,
        images: [backdrops, logos, posters].flat(),
      });
    };
    getData();
  }, [id, userMovieInfo]);

  const { movie, providers, similars, cast, images } = infoMovie;

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
    videos,
  } = infoMovie.movie;

  const hoursWatch = Math.floor(+runtime / 60);
  const minutesWath = +runtime % 60;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogged = async (type?: 'favorite' | 'watchlist') => {
    const savedUser = JSON.parse(localStorage.getItem('user') as string) || {} as any;
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
              <div>
                <p>
                  {userMovieInfo.rated
                    ? t('movie.rate.change') : t('movie.rate.add')}
                </p>
                <button onClick={ openModal }>
                  <img src="/starIcon.png" alt="" style={ { width: 50 } } />
                </button>
              </div>
              <div>
                <p>
                  {userMovieInfo.favorite
                    ? t('movie.favorite.remove') : t('movie.favorite.add')}
                </p>
                <button onClick={ () => handleLogged('favorite') }>
                  <img src="/favHearth.png" alt="" style={ { width: 50 } } />
                </button>
              </div>
              <div>
                <p>
                  {userMovieInfo.watchlist
                    ? t('movie.watchlist.remove') : t('movie.watchlist.add')}
                </p>
                <button onClick={ () => handleLogged('watchlist') }>
                  <img src="/wathclist.png" alt="" style={ { width: 50 } } />
                </button>
              </div>
            </div>
            <img src={ imageUrl + poster_path } alt="" />
            <MediaButtons videos={ videos } images={ images } />
            <p>
              {/* ESSAS VERIFCAÇÕES PODEM SER FEITAS COM O ITEM, MOVIE.STATUS === RELEASED */}
              {vote_average > +0
                ? release_date?.split('-')[0]
                : `${t('movie.releaseDate')} ${formattedDate(release_date)}`}
            </p>
            <p>
              {minutesWath && hoursWatch
                ? `${t('movie.duration')} ${hoursWatch}h ${minutesWath}m`
                : t('movie.notInformed')}
            </p>
            <div>
              <p>{t('movie.genres')}</p>
              {genres?.slice(0, 3)?.map(({ name }) => <p key={ name }>{name}</p>)}
            </div>
            <p>{overview}</p>
            {!!cast.length && <div>
              <Link to={ `/cast/${movie.id}` }>{t('movie.seeFullCast')}</Link>
              <MovieCarousel movies={ cast?.slice(0, 12) } text={ t('movie.cast') } />
            </div>}
            {homepage
            && <p>
              {t('movie.learnMore')}
              <a href={ homepage } target="blanck">{` ${title}`}</a>
            </p>}
            <div>
              <p>{t('movie.whereWatch')}</p>
              { !providers ? <p>{t('movie.noServicesFound')}</p>
                : (<ProvidersCard providers={ providers } />)}
            </div>
            <div>
              {!!similars.length
              && <p>{t('movie.similars')}</p>
              && <MovieCarousel
                movies={ similars.slice(0, 12) }
                text={ t('movie.moreLikeThis') }
              />}
            </div>

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
