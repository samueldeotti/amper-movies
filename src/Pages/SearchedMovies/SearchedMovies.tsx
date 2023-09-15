import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getByGenre, getMoviesByName } from '../../utils';

import { MovieProps } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function SearchedMovies() {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const { id, name } = useParams();
  const [searchParams] = useSearchParams();
  const searchMovie = searchParams.get('q');

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await getByGenre(id as string);
        setMovies(data.results);
      } else {
        const data = await getMoviesByName(searchMovie as string);
        setMovies(data.results);
      }
    };
    getData();
  }, [id, searchMovie]);

  return (
    <div>
      {!movies.length ? <p>Loading...</p>
        : (
          <div>
            <p>{`All ${name} movies`}</p>
            {movies.map((movie) => (
              <MovieCard key={ movie.id } movie={ movie } />
            ))}
          </div>
        )}

    </div>
  );
}
