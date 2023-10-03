/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { getCertainData } from '../../utils';
import { ActorMoviesProps, ImageDetailsProps, PersonProps } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';
import MediaButtons from '../../components/MediaButtons/MediaButtons';

export default function Person() {
  const [person, setPerson] = useState({} as PersonProps);
  const [allMovies, setAllMovies] = useState<ActorMoviesProps[]>([]);
  const [images, setImages] = useState<ImageDetailsProps[]>([]);

  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMG;

  useEffect(() => {
    const getData = async () => {
      const personData = await getCertainData(`person/${id}`);
      const moviesData = await getCertainData(`person/${id}/combined_credits`);
      const imagesData = await getCertainData(`person/${id}/images`);

      setPerson(personData);
      setAllMovies(moviesData.cast);
      setImages(imagesData.profiles);
    };
    getData();
  }, [id]);

  const filteredMovies = [...allMovies]
    .filter((movie) => movie
      .media_type === 'movie'
      && movie.poster_path && movie.vote_average > 0 && movie.vote_average < 10);

  const partipantMovies = [...filteredMovies]
    .sort((a, b) => +b.release_date.slice(0, 4) - +a.release_date.slice(0, 4));

  const relevantMovies = [...filteredMovies]
    .sort((a, b) => +b.vote_count - +a.vote_count);

  const { name, profile_path, biography, birthday } = person;
  let formattedDate = '';
  if (birthday) {
    formattedDate = i18n.language
      ? format(new Date(birthday), 'dd/MM/yyyy')
      : format(new Date(birthday), 'MM/dd/yyyy');
  }

  return (
    <div>
      <p>{name}</p>
      <img src={ imageUrl + profile_path } alt="" />
      <MediaButtons images={ images } />
      <p>{biography}</p>
      <p>{`${t('person.birthday')}: ${formattedDate || 'Unknown'}`}</p>
      <div>
        <p>{t('person.knownFor')}</p>
        {relevantMovies
          ?.splice(0, 4).map((movie) => (<MovieCard
              movie={ movie }
              key={ movie.id }
              character={ movie.character }
          />))}
      </div>
      <div>
        <p>{t('person.participated')}</p>
        {partipantMovies
          ?.map((movie) => (<MovieCard
              movie={ movie }
              key={ movie.id }
              character={ movie.character }
          />))}
      </div>
    </div>
  );
}
