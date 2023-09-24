/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CastDetailsProps, MovieDetailsProps, ProvidersProps } from '../../types';
import { getCertainData } from '../../utils';
import ProvidersCard from '../../components/ProvidersCard/ProvidersCard';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

export default function Movie() {
  const [movie, setMovie] = useState({} as MovieDetailsProps);
  const [providers, setProviders] = useState<ProvidersProps
  | undefined>({} as ProvidersProps);
  const [similars, setSimilars] = useState([] as MovieDetailsProps[]);
  const [cast, setCast] = useState<CastDetailsProps[]>([]);

  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMG;

  useEffect(() => {
    const getData = async () => {
      const data = await getCertainData(`movie/${id}`);
      const seenRecently = JSON.parse(localStorage.getItem('seenRecently') || '[]');
      if (!seenRecently.includes(data.id)) {
        localStorage.setItem('seenRecently', JSON
          .stringify([...seenRecently, data.id]));
      }
      const providersData = await getCertainData(`movie/${id}/watch/providers`);
      const similarData = await getCertainData(`movie/${id}/similar`);
      const castData = await getCertainData(`movie/${id}/credits`);
      setMovie(data);
      setProviders(providersData.US);
      setSimilars(similarData);
      setCast(castData.cast);
    };
    getData();
  }, [id]);

  const {
    genres,
    homepage,
    overview,
    poster_path,
    release_date,
    runtime,
    tagline,
    title,
    vote_average,
  } = movie;

  const hoursWatch = Math.abs(+runtime / 60);
  const minutesWath = (hoursWatch - Math.floor(hoursWatch))
    .toFixed(2).toString().split('.')[1];

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!id ? <p>Loading...</p>
        : (
          <div>
            <h2>{title}</h2>
            <p>{tagline}</p>
            <p>{Number(vote_average).toFixed(1)}</p>
            <img src={ imageUrl + poster_path } alt="" />
            <p>{release_date?.split('-')[0]}</p>
            <p>{`Duration ${hoursWatch.toFixed(0)}h ${minutesWath}m`}</p>
            <div>
              <p>Genres</p>
              {genres?.slice(0, 3)?.map(({ name }) => <p key={ name }>{name}</p>)}
            </div>
            <p>{overview}</p>
            <div>
              <Link to={ `/cast/${movie.id}` }>See the full cast</Link>
              <MovieCarousel movies={ cast?.slice(0, 12) } text="Cast" />
            </div>
            {homepage
            && <p>
              To learn more
              <a href={ homepage } target="blanck">{` ${title}`}</a>
            </p>}
            <div>
              <p>Where to Watch</p>
              { !providers ? <p>No services found</p>
                : (<ProvidersCard providers={ providers } />)}
            </div>
            <p>Similars</p>
            <div>
              <MovieCarousel movies={ similars.slice(0, 12) } text="More like this" />
            </div>
          </div>

        )}
    </>
  );
}
