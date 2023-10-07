import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHomeMovies } from '../../utils';
import { HomeMoviesProps } from '../../types';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import { HomeContainer, PopularContent } from './HomeStyle';
import PopularCard from '../../components/PopularCard/PopularCard';

export default function Home() {
  const [homeMovies, setHomeMovies] = useState({} as HomeMoviesProps);
  const { t } = useTranslation();

  const imageUrl = import.meta.env.VITE_IMG;

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
    <HomeContainer>
      {Object.keys(homeMovies).length === 0 ? <p>Loading...</p>
        : (
          <>
            <PopularContent>
              <PopularCard movies={ popular } />
            </PopularContent>
            <div style={ { marginTop: '40vh' } }>
              <MovieCarousel movies={ trending } text={ t('home.trending') } />
              <MovieCarousel
                movies={ upcoming }
                text={ t('home.upcoming') }
                type="Upcoming"
              />
              <MovieCarousel movies={ topRated } text={ t('home.rated') } />
              {!!recentlyMovies.length
            && <MovieCarousel movies={ recentlyMovies } text={ t('home.viewed') } />}
            </div>
          </>
        )}
    </HomeContainer>
  );
}
