import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCertainData, getSearched } from '../../utils';

import { ActorMoviesProps, MovieProps } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';
import PersonCard from '../../components/PersonCard/PersonCard';

export default function SearchedMovies() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [persons, setPersons] = useState<ActorMoviesProps[]>([]);
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
                {persons.length ? persons.map((person) => (
                  <PersonCard
                    key={ person.id }
                    personInfo={ person }
                  />
                )) : (<p>{t('search.noResults')}</p>)}
              </div>
            )}
            <div>
              <p>{`${t('search.resultsFor')} ${name || ''}`}</p>
              {movies.length ? movies.map((movie) => (
                <MovieCard key={ movie.id } movie={ movie } />
              ))
                : <p>{t('search.noResults')}</p>}
            </div>
          </div>
        )}
    </div>
  );
}
