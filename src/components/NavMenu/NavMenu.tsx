import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllGenres } from '../../utils';
import { GenreProps } from '../../types';

export default function NavMenu() {
  const [genres, setGenres] = useState<GenreProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllGenres();
      setGenres(data.genres);
    };
    getData();
  }, []);

  return (
    <aside style={ { display: 'flex', flexDirection: 'column' } }>
      {genres.length === 0 ? <p>loading</p>
        : genres.map((genre) => (
          <NavLink
            key={ genre.id }
            to={ `/genre/${genre.id}/${genre.name}` }
          >
            {genre.name}
          </NavLink>
        ))}
    </aside>
  );
}
