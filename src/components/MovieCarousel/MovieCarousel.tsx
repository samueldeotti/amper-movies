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

  // functions
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>) {
    setIsDown(true);
    if (e.pageX === undefined) {
      setStartX(e.touches[0].pageX - (itemsContainer.current?.offsetLeft || 0));
    } else setStartX(e.pageX - (itemsContainer.current?.offsetLeft || 0));
    setScrollLeftState(itemsContainer.current?.scrollLeft || 0);
    setStateMouseMoved(0);
  }

  function handleMouseMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDown) return;
    const currentMousePositionInsideContainer = e.pageX === undefined
      ? e.touches[0].pageX - (itemsContainer.current?.offsetLeft || 0)
      : e.pageX - (itemsContainer.current?.offsetLeft || 0);

    setStateMouseMoved(currentMousePositionInsideContainer - startX);
  }

  useEffect(() => {
    itemsContainer.current.scrollLeft = (scrollLeftState || 0) - mouseMoved;
  }, [scrollLeftState, mouseMoved]);

  return (
    <div
      style={ { display: 'flex', width: '100vw', overflow: 'hidden', userSelect: 'none', cursor: isDown ? 'grabbing' : 'grab' } }
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
      <p>{text}</p>
      <div style={ { display: 'flex', pointerEvents: isDown ? 'none' : 'all' } }>
        {movies.map((movie: any) => (movie?.title
          ? <MovieCard key={ movie.id } movie={ movie } type={ type } />
          : <CastCard key={ movie.id } cast={ movie } />))}
      </div>
    </div>
  );
}
