/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MovieDetailsProps } from '../../types';
import { deleteRating, getCertainData, handleLoggedMovies } from '../../utils';
import MovieCard from '../MovieCard/MovieCard';

export default function LogedMovie() {
  const [movieList, setMovieList] = useState<MovieDetailsProps[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const { t } = useTranslation();

  const { pathname } = window.location;
  const type = pathname.split('/')[2];

  const savedUser = JSON.parse(localStorage.getItem('user') as string) || null;
  const formatedTitle = type
    .charAt(0).toUpperCase() + type.slice(1);

  useEffect(() => {
    const getData = async () => {
      if (!savedUser) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
        const requisitionData = await
        getCertainData(`account/${savedUser.id}/${type}/movies`);
        setMovieList(requisitionData);
      }
    };
    getData();
  }, [movieList.length, type, savedUser]);

  const handleLogin = async () => {
    const data = await getCertainData('https://api.themoviedb.org/3/authentication/token/new');
    window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://ampermovies.surge.sh/movies/${type}`;
  };

  const handleClick = async (movieId: number) => {
    const response = (type.includes('rated')
      ? await deleteRating(movieId, savedUser.id)
      : await handleLoggedMovies(movieId, savedUser.id, false, type));

    alert(response.success
      ? `Removed from ${formatedTitle}`
      : 'Something went wrong');
    const data = await getCertainData(`account/${savedUser.id}/${type}/movies`);
    setMovieList(data);
  };

  return (
    <div>
      {isLogged ? (
        <>
          <h1>{`${formatedTitle} ${t('logged.movies')}`}</h1>
          {movieList.length ? (
            movieList.map((movie) => (
              <div key={ movie.id }>
                <MovieCard movie={ movie } />
                <button
                  onClick={ () => handleClick(movie.id) }
                >
                  {type.includes('rated') ? t('logged.rated') : ''}
                  {type.includes('favorite') ? t('logged.favorites') : ''}
                  {type.includes('watchlist') ? t('logged.watchlist') : ''}
                </button>
                <button onClick={ () => navigator.clipboard.writeText(`https://ampermovies.surge.sh/movie/${movie.id}`) }>{t('logged.Share')}</button>
              </div>
            ))
          ) : (<p>{t('logged.dontHave')}</p>)}
        </>
      ) : (
        <div>
          <p>{t('logged.youNeed')}</p>
          <button onClick={ handleLogin }>Login</button>
        </div>
      )}
    </div>
  );
}
