import { useEffect, useState } from 'react';
import { MovieDetailsProps } from '../../types';
import { getCertainData, handleFavorite } from '../../utils';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState<MovieDetailsProps[]>([]);
  const [isLogged, setIsLogged] = useState(false);

  const savedUser = JSON.parse(localStorage.getItem('user') as string) || null;

  useEffect(() => {
    const getData = async () => {
      if (!savedUser) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
        const favoritesData = await
        getCertainData(`account/${savedUser.id}/favorite/movies`);
        setFavorites(favoritesData);
      }
    };
    getData();
  }, [favorites.length]);

  const handleLogin = async () => {
    const data = await getCertainData('https://api.themoviedb.org/3/authentication/token/new');
    window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://ampermovies.surge.sh`;
  };

  const removeFavorite = async (movieId: number) => {
    const response = await handleFavorite(movieId, savedUser.id, false);
    alert(response.success ? 'Removed from favorites' : 'Something went wrong');
    const favoritesData = await
    getCertainData(`account/${savedUser.id}/favorite/movies`);
    setFavorites(favoritesData);
  };

  return (
    <div>
      {isLogged ? (
        <>
          <h1>Favorites Movies</h1>
          {favorites.map((movie) => (
            <div key={ movie.id }>
              <MovieCard movie={ movie } />
              <button onClick={ () => removeFavorite(movie.id) }>Desfavorite</button>
              <button onClick={ () => navigator.clipboard.writeText(`https://ampermovies.surge.sh/movie/${movie.id}`) }>Share</button>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>You need to login to access this page</p>
          <button onClick={ handleLogin }>Login</button>
        </>
      )}
    </div>
  );
}
