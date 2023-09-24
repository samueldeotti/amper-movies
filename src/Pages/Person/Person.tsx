/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCertainData } from '../../utils';
import { ActorMoviesProps, PersonProps } from '../../types';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function Person() {
  const [person, setPerson] = useState({} as PersonProps);
  const [allMovies, setAllMovies] = useState<ActorMoviesProps[]>([]);

  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMG;

  useEffect(() => {
    const getData = async () => {
      const personData = await getCertainData(`person/${id}`);
      const moviesData = await getCertainData(`person/${id}/combined_credits`);
      setPerson(personData);
      setAllMovies(moviesData.cast);
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
    .sort((a, b) => +b.popularity - +a.popularity);

  const { name, profile_path, biography, birthday } = person;
  person.birthday = birthday?.replace(/-/g, '/');
  let formatedBirthday;
  if (birthday) {
    formatedBirthday = birthday.split('/');
    formatedBirthday = `
    ${formatedBirthday[2]}/${formatedBirthday[1]}/${formatedBirthday[0]}
    `;
  }

  return (
    <div>
      <p>{name}</p>
      <img src={ imageUrl + profile_path } alt="" />
      <p>{biography}</p>
      <p>{`Birthday: ${formatedBirthday}`}</p>
      <div>
        <p>Know for</p>
        {relevantMovies
          ?.splice(0, 4).map((movie) => (<MovieCard
              movie={ movie }
              key={ movie.id }
              character={ movie.character }
          />))}
      </div>
      <div>
        <p>Movies</p>
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
