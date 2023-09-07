import { useEffect, useState } from 'react';
import { getPopularMovies, getTopRated, getTrending, getUpcoming } from '../../utils';
import { HomeMoviesProps } from '../../types';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

export default function Home() {
  const [homeMovies, setHomeMovies] = useState({} as HomeMoviesProps);

  useEffect(() => {
    const getData = async () => {
      const popularData = await getPopularMovies();
      const trendingData = await getTrending();
      const upcomingData = await getUpcoming();
      const topRatedData = await getTopRated();
      setHomeMovies({
        popular: popularData.results,
        trending: trendingData.results,
        upcoming: upcomingData.results,
        topRated: topRatedData.results,
      });
    };
    getData();
  }, []);

  return (
    <div>
      {Object.keys(homeMovies).length === 0 ? <p>Loading...</p>
        : (
          <>
            <MovieCarousel movies={ homeMovies.popular } text="Popular movies" />
            <MovieCarousel movies={ homeMovies.trending } text="Trending today" />
            <MovieCarousel movies={ homeMovies.upcoming } text="Upcoming movies" />
            <MovieCarousel movies={ homeMovies.topRated } text="Top rated movies" />
          </>
        )}
    </div>
  );
}
