import MovieCard from '../MovieCard/MovieCard';
import CastCard from '../CastCard/CastCard';

type MovieCardProps = {
  movies: any;
  text: string
  type?: string
};

export default function MovieCarousel({ movies, text, type = '' }: MovieCardProps) {
  return (
    <div
      style={ {
        display: 'flex',
        maxWidth: 1000,
        overflowX: 'auto',
        maxHeight: 550,
        overflowY: 'hidden' } }
    >
      <p>{text}</p>
      {movies.map((movie: any) => (movie?.title
        ? <MovieCard key={ movie.id } movie={ movie } type={ type } />
        : <CastCard key={ movie.id } cast={ movie } />))}
    </div>
  );
}
