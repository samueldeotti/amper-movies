import MovieCard from '../MovieCard/MovieCard';
import CastCard from '../CastCard/CastCard';

type MovieCardProps = {
  movies: any;
  text: string
};

export default function MovieCarousel({ movies, text }: MovieCardProps) {
  return (
    <div style={ { display: 'flex' } }>
      <p>{text}</p>
      {movies.map((movie: any) => (movie?.title
        ? <MovieCard key={ movie.id } movie={ movie } />
        : <CastCard key={ movie.id } cast={ movie } />))}
    </div>
  );
}
