/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import CastCard from '../CastCard/CastCard';

type MovieCardProps = {
  movies: any;
  text: string
  type?: string
};

export default function MovieCarousel({ movies, text, type = '' }: MovieCardProps) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState<number | null>(null);
  const [mouseMoved, setStateMouseMoved] = useState(0);

  const itemsContainer = useRef<HTMLDivElement>(null);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>) {
    setIsDown(true);
    if ('touches' in e) {
      setStartX(e.touches[0].pageX - (itemsContainer.current?.offsetLeft || 0));
    } else {
      setStartX(e.pageX - (itemsContainer.current?.offsetLeft || 0));
    }
    setScrollLeftState(itemsContainer.current?.scrollLeft || 0);
    setStateMouseMoved(0);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>) {
    if (!isDown) return;
    const currentMousePositionInsideContainer = 'touches' in e
      ? (e.touches[0].pageX - (itemsContainer.current?.offsetLeft || 0))
      : (e.pageX - (itemsContainer.current?.offsetLeft || 0));

    setStateMouseMoved(currentMousePositionInsideContainer - startX);
  }

  useEffect(() => {
    if (itemsContainer.current) {
      itemsContainer.current.scrollLeft = ((scrollLeftState || 0) - mouseMoved);
    }
  }, [scrollLeftState, mouseMoved, itemsContainer]);

  return (
    <div>
      <p style={ { marginLeft: '10px', userSelect: 'none' } }>{text}</p>
      <div
        style={ {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100vw - 30px)',
          overflow: 'hidden',
          userSelect: 'none',
          cursor: isDown ? 'grabbing' : 'grab' } }
        ref={ itemsContainer }
      // MOUSE EVENTS
        onMouseDown={ (e) => handleMouseDown(e) }
        onMouseUp={ () => setIsDown(false) }
        onMouseLeave={ () => setIsDown(false) }
        onMouseMove={ (e) => handleMouseMove(e) }
      // TOUCH EVENTS
        onTouchStart={ (e) => handleMouseDown(e) }
        onTouchEnd={ () => setIsDown(false) }
        onTouchCancel={ () => setIsDown(false) }
        onTouchMove={ (e) => handleMouseMove(e) }
      >
        <div
          style={ { display: 'flex',
            pointerEvents: isDown ? 'none' : 'all',
            marginLeft: '10px' } }
        >
          {movies.map((movie: any) => (movie?.title
            ? <MovieCard key={ movie.id } movie={ movie } type={ type } />
            : <CastCard key={ movie.id } cast={ movie } />))}
        </div>
      </div>

    </div>
  );
}
