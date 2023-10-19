import { useEffect, useState } from 'react';
import { MovieProps } from '../../types';
import { PopularDiv, CardImage, Background,
  CardButton, CardContainer } from './PopularStyle';

type PopularProps = {
  movies: MovieProps[];
};

export default function PopularCard({ movies }: PopularProps) {
  const imageUrl = import.meta.env.VITE_IMG;

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((selected + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies, selected]);

  return (
    <>
      <Background
        style={ { userSelect: 'none' } }
        image={ imageUrl.replace('w500', 'original')
            + movies[selected].backdrop_path }
      />
      <PopularDiv>
        {movies.map((movie, index) => (
          <CardContainer key={ movie.id } onClick={ () => setSelected(index) }>
            {selected === index
            && <CardButton to={ `/movie/${movie.id}` }>Details</CardButton>}
            <CardImage
              selected={ selected === index }
              src={ imageUrl + movie.poster_path }
              alt="movie poster"
            />
          </CardContainer>
        ))}

      </PopularDiv>
    </>
  );
}
