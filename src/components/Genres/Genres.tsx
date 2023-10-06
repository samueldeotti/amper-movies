/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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

    <div style={ { display: 'flex', flexWrap: 'wrap' } }>
      {!genres.length ? <p>Loading...</p>
        : genres.map((genre) => (
          <NavLink to={ `/genre/${genre.id}/${genre.name}` } key={ genre.id } style={ { minWidth: 170, backgroundColor: 'gray', padding: '20px', margin: '10px' } }>
            {genre.name}
          </NavLink>
        ))}

    </div>
  );
}
