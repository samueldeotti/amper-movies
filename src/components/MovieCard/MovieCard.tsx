/* eslint-disable react/jsx-max-depth */
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { ActorMoviesProps, DetailsProps,
  MovieDetailsProps, MovieProps } from '../../types';
import { MovieContainer, CardPoster, CardImage, SearchDiv,
  CardInfo, CardTitle, Director, RatingDiv, StarsDiv,
  RatingSpan, TagsDiv, TagsSpan, ReleaseSpan,
  MovieDetails, MovieCast, CastUl, CastLi, CastImage, SearchInfo,
} from './MovieCardStyle';

import { getCertainData } from '../../utils';

type MovieCardProps = {
  movie: MovieProps | MovieDetailsProps | ActorMoviesProps;
  character?: string;
  type?: string
  search?: boolean;
  ul?: boolean;
};

export default function MovieCard({ movie, character = '',
  type = '', search = false, ul = false }: MovieCardProps) {
  const { i18n } = useTranslation();

  const [details, setDetails] = useState<DetailsProps>({} as DetailsProps);

  const { pathname } = window.location;

  useEffect(() => {
    const getDetails = async () => {
      // eslint-disable-next-line max-len
      const { images, credits, genres } = await getCertainData(`movie/${movie.id}?append_to_response=credits,images&include_image_language=${i18n.language},null`);
      setDetails({ images, credits, genres });
    };
    getDetails();
  }, [movie.id, pathname]);

  const formatDate = (date: string) => {
    if (date) {
      return i18n.language
        ? format(new Date(date), 'dd/MM/yyyy')
        : format(new Date(date), 'MM/dd/yyyy');
    }
    return '';
  };

  const director = details?.credits?.crew
    ?.find((person) => person.job === 'Director')?.name;
  const poster = details?.images?.posters[0]?.file_path;

  const imageUrl = import.meta.env.VITE_IMG;
  const firstActor = details?.credits?.cast[0]?.name;
  const secondActor = details?.credits?.cast[1]?.name;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { search ? (
        <SearchDiv to={ `/movie/${movie.id}` } list={ ul }>
          <img
            src={ imageUrl + movie.poster_path }
            alt="movie poster"
          />
          <SearchInfo>
            <p>{movie.title}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>
              {`${firstActor}${secondActor ? `, ${secondActor}` : ''}`}
            </p>
          </SearchInfo>
        </SearchDiv>
      )
        : (
          <MovieContainer
            to={ `/movie/${movie.id}` }
            className="card"
            style={ { userSelect: 'none' } }
            search={ pathname.includes('search') }
          >
            <CardPoster className="poster" style={ { userSelect: 'none' } }>
              <CardImage
                src={ poster ? imageUrl + poster : imageUrl + movie.poster_path }
                alt="movie poster"
              />
            </CardPoster>
            <CardInfo className="details">
              <CardTitle>{movie.title}</CardTitle>
              {director && <Director>{`Directed by: ${director}`}</Director>}
              <RatingDiv>
                {type === 'Upcoming' ? (
                  <>
                    <ReleaseSpan>Release Date:</ReleaseSpan>
                    <span>{formatDate(movie.release_date)}</span>
                  </>
                ) : (
                  <>
                    <StarsDiv>
                      <span>
                        <Rating
                          name="read-only"
                          value={ (+movie.vote_average.toFixed(1) / 2) }
                          readOnly
                          precision={ 0.1 }
                        />
                      </span>
                    </StarsDiv>
                    <RatingSpan>
                      {movie
                        .vote_average.toFixed(1) === '0.0'
                        ? '' : (+movie.vote_average.toFixed(1) / 2).toFixed(1)}
                      /5
                    </RatingSpan>
                  </>

                )}
              </RatingDiv>
              {!!details.genres?.length
        && (
          <TagsDiv className="tags">
            <TagsSpan>{details?.genres[0]?.name}</TagsSpan>
            {details?.genres[1]?.name && <TagsSpan>{details?.genres[1]?.name}</TagsSpan>}
          </TagsDiv>)}
              <MovieDetails className="info">
                <p>
                  {movie.overview.split(' ').slice(0, 9).join(' ').replace(/,\s*$/, '')}
                  ...
                </p>
              </MovieDetails>
              <MovieCast className="cast">
                <h4>Cast</h4>
                <CastUl>
                  {details.credits?.cast?.slice(0, 5).map((person) => (
                    <CastLi key={ person.id } title={ person.name }>
                      <Link to={ `/person/${person.name.replace(' ', '')}/${person.id}` }>
                        <CastImage
                          src={ person.profile_path
                            ? imageUrl + person.profile_path : '/anonym.png' }
                          alt="actor"
                        />
                      </Link>
                    </CastLi>
                  ))}
                </CastUl>

              </MovieCast>
            </CardInfo>
            {character && <p>{character}</p>}
          </MovieContainer>
        ) }

    </>

  );
}

// const logo = details?.images?.logos[0]?.file_path;
/* {logo ? <img
  className="logo"
          src={ imageUrl.replace('w500', 'w185') + logo }
          alt=""
        /> : <h2 className="title">{movie.title}</h2>} */
