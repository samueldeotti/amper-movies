import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCertainData } from '../../utils';
import { GenreProps } from '../../types';

export default function NavMenu() {
  const [genres, setGenres] = useState<GenreProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCertainData('genre/movie/list');
      setGenres(data.genres);
    };
    getData();
  }, []);

  return (
    <ul>
      <li>Login</li>
      <li>Languages</li>
      <li>en-US</li>
      <li>pt-BR</li>

      {/* {genres.length === 0 ? <p>loading...</p>
        : genres.map((genre, index) => (
          <li key={ genre.id } style={ { '--i': index } as React.CSSProperties }>
            <NavLink to={ `/genre/${genre.id}/${genre.name}` }>
              {genre.name}
            </NavLink>
          </li>
        ))} */}
    </ul>
  );
}
