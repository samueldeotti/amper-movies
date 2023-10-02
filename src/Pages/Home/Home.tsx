import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHomeMovies } from '../../utils';
import { HomeMoviesProps } from '../../types';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

export default function Home() {
  const [homeMovies, setHomeMovies] = useState({} as HomeMoviesProps);
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const { popularData,
        trendingData, filterUpcoming, topRatedData, recentlyMovies,
      } = await getHomeMovies();

      setHomeMovies({
        popular: popularData,
        trending: trendingData,
        upcoming: filterUpcoming,
        topRated: topRatedData,
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
            <MovieCarousel movies={ popular } text={ t('home.popular') } />
            <MovieCarousel movies={ trending } text={ t('home.trending') } />
            <MovieCarousel
              movies={ upcoming }
              text={ t('home.upcoming') }
              type="Upcoming"
            />
            <MovieCarousel movies={ topRated } text={ t('home.rated') } />
            {recentlyMovies.length
            && <MovieCarousel movies={ recentlyMovies } text={ t('home.viewed') } />}
          </>
        )}
    </div>
  );
}
