/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { CastDetailsProps,
  MovieDetailsProps,
  ProvidersProps, ImageDetailsProps, UserInfoMovie } from '../../types';
import { addRating, customStyles, getCertainData, handleLoggedMovies } from '../../utils';
import ProvidersCard from '../../components/ProvidersCard/ProvidersCard';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

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

      setMovieInfo({
        movie: data,
        providers: savedUser.id
          ? providersData.results[savedUser.iso_3166_1]
          : providersData.results.US,
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
                <p>TMDB Rating</p>
                <p>{Number(vote_average).toFixed(1)}</p>
              </div>
              <div>
                <p>{userMovieInfo.rated ? 'Change your rate' : 'Add your rate'}</p>
                <button onClick={ openModal }>
                  <img src="/starIcon.png" alt="" style={ { width: 50 } } />
                </button>
              </div>
              <div>
                <p>
                  {userMovieInfo.favorite
                    ? 'Remove from favorites' : 'Add to your favorites'}
                </p>
                <button onClick={ () => handleLogged('favorite') }>
                  <img src="/favHearth.png" alt="" style={ { width: 50 } } />
                </button>
              </div>
              <div>
                <p>
                  {userMovieInfo.watchlist
                    ? 'Remove from the watchlist' : 'Add to your watchlist'}
                </p>
                <button onClick={ () => handleLogged('watchlist') }>
                  <img src="/wathclist.png" alt="" style={ { width: 50 } } />
                </button>
              </div>
            </div>
            <img src={ imageUrl + poster_path } alt="" />
            <div>
              <button>
                {`Videos ${videos.results.length > 99 ? '99+' : videos.results.length}`}
              </button>
              <button>
                {`Photos ${images.length > 99 ? '99+' : images.length}`}
              </button>
            </div>
            <p>{release_date?.split('-')[0]}</p>
            <p>{`Duration ${hoursWatch}h ${minutesWath}m`}</p>
            <div>
              <p>Genres</p>
              {genres?.slice(0, 3)?.map(({ name }) => <p key={ name }>{name}</p>)}
            </div>
            <p>{overview}</p>
            <div>
              <Link to={ `/cast/${movie.id}` }>See the full cast</Link>
              <MovieCarousel movies={ cast?.slice(0, 12) } text="Cast" />
            </div>
            {homepage
            && <p>
              To learn more
              <a href={ homepage } target="blanck">{` ${title}`}</a>
            </p>}
            <div>
              <p>Where to Watch</p>
              { !providers ? <p>No services found</p>
                : (<ProvidersCard providers={ providers } />)}
            </div>
            <p>Similars</p>
            <div>
              <MovieCarousel movies={ similars.slice(0, 12) } text="More like this" />
            </div>

            <Modal
              isOpen={ isOpen }
              onRequestClose={ closeModal }
              style={ customStyles }
              contentLabel="Rate Modal"
              ariaHideApp={ false }
            >
              <div>
                <p>Rate this</p>
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
                <button type="submit">Rate</button>
              </form>
            </Modal>
          </div>
        )}

    </>
  );
}
