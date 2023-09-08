import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getByGenre } from '../../utils';

import { MovieProps } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function SearchedMovies() {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const { id, name } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getByGenre(id as string);
      console.log(data);
      setMovies(data.results);
    };
    getData();
  }, [id]);

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
