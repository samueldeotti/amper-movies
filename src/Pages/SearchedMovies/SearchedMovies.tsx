import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCertainData, getSearched } from '../../utils';

import { ActorMoviesProps, MovieProps } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';
import PersonCard from '../../components/PersonCard/PersonCard';
import { CardsContainer } from './SearchStyle';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function SearchedMovies() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [persons, setPersons] = useState<ActorMoviesProps[]>([]);
  const [setAll, setSetAll] = useState({
    movies: false,
    person: false,
  });
  const { t } = useTranslation();

  const { id, name } = useParams();
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('q');
  const { pathname } = window.location;

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await getCertainData(`discover/movie?with_genres=${id}`);
        setMovies(data);
      } else {
        const { movie, people } = await getSearched(searchParam as string);
        setPersons(people);
        setMovies(movie);
      }
    };
    getData();
  }, [id, searchParam]);

  return (
    <div>
      {!movies.length ? <p>Loading...</p> /* MUDAR ESSA PARTE QUANDO FIZER O LAZY LOADING, AQUI QUANDO NAO TIVER NENHUM FILME, VAI FICAR SEMPRE CARREGANDO */
        : (
          <div>
            {!pathname.includes('genre') && (
              <div>
                <p>{t('search.people')}</p>
                {persons.length ? (
                  <div>
                    {(setAll.person ? persons : persons.slice(0, 3)).map((person) => (
                      <PersonCard
                        key={ person.id }
                        personInfo={ person }
                      />
                    ))}
                    <button
                      onClick={ () => setSetAll({ ...setAll, person: !setAll.person }) }
                    >
                      {`${setAll.person ? 'Hide' : 'Show All'}`}
                    </button>
                  </div>
                ) : (<p>{t('search.noResults')}</p>)}
              </div>
            )}
            <div>
              <p>{`${t('search.resultsFor')} ${searchParam || name || ''}`}</p>
              {movies.length ? (
                <CardsContainer>
                  {movies.map((movie) => <MovieCard key={ movie.id } movie={ movie } />)}
                </CardsContainer>
              ) : <p>{t('search.noResults')}</p>}
            </div>
          </div>
        )}
    </div>
  );
}
