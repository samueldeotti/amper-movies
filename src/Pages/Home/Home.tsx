import { useEffect, useState } from 'react';
import { getHomeMovies } from '../../utils';
import { HomeMoviesProps } from '../../types';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

export default function Home() {
  const [homeMovies, setHomeMovies] = useState({} as HomeMoviesProps);

  useEffect(() => {
    const getData = async () => {
      const { popularData,
        trendingData, upcomingData, topRatedData, recentlyMovies,
      } = await getHomeMovies();
      setHomeMovies({
        popular: popularData.results,
        trending: trendingData.results,
        upcoming: upcomingData.results,
        topRated: topRatedData.results,
        recentlyMovies,
      });
    };
    getData();
  }, []);

  const { popular, trending, upcoming, topRated, recentlyMovies } = homeMovies;

  return (
    <div>
      {Object.keys(homeMovies).length === 0 ? <p>Loading...</p>
        : (
          <>
            <MovieCarousel movies={ popular } text="Popular" />
            <MovieCarousel movies={ trending } text="Trending today" />
            <MovieCarousel movies={ upcoming } text="Upcoming" />
            <MovieCarousel movies={ topRated } text="Top rated" />
            {recentlyMovies.length
            && <MovieCarousel movies={ recentlyMovies } text="Seen Recently" />}

          </>
        )}
    </div>
  );
}
