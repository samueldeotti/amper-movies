/* eslint-disable @typescript-eslint/naming-convention */
import { ActorMoviesProps } from '../../types';
import { SearchDiv, SearchInfo } from '../MovieCard/MovieCardStyle';

type PersonCardProps = {
  personInfo: ActorMoviesProps;
  ul?: boolean;
};

const imageUrl = import.meta.env.VITE_IMG;

export default function PersonCard({ personInfo, ul = false }: PersonCardProps) {
  const { id, name, known_for_department, profile_path, known_for } = personInfo;

  return (

    <SearchDiv to={ `/person/${name.replace(' ', '')}/${id}` } list={ ul }>
      <img
        src={ profile_path ? imageUrl + profile_path : '/anonym.png' }
        alt=""
      />
      <SearchInfo>
        <p>{name}</p>
        <p>{known_for_department}</p>
        <p>
          {`${known_for[0].title || known_for[0].name} 
        (${known_for[0].release_date?.split('-')[0]
        || known_for[0].first_air_date?.split('-')[0]})`}
        </p>
      </SearchInfo>
    </SearchDiv>
  );
}
