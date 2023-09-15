/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetailsProps, ProvidersProps } from '../../types';
import { getByMovie, getProviders } from '../../utils';
import ProvidersCard from '../../components/ProvidersCard/ProvidersCard';

export default function Movie() {
  const [movie, setMovie] = useState({} as MovieDetailsProps);
  const [providers, setProviders] = useState<ProvidersProps
  | undefined>({} as ProvidersProps);

  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMG;

  useEffect(() => {
    const getData = async () => {
      const data = await getByMovie(id as string);
      const providersData = await getProviders(id as string);
      setProviders(providersData.results.US);
      setMovie(data);
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
            <p>{`Release Date ${release_date}`}</p>
            <p>{`Duration ${runtime} minutes`}</p>
            <div>
              <p>Genres</p>
              {genres?.map(({ name }) => <p key={ name }>{name}</p>)}
            </div>
            <p>{overview}</p>
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
          </div>

        )}
    </>
  );
}
