/* eslint-disable @typescript-eslint/naming-convention */
import { Link } from 'react-router-dom';
import { ActorMoviesProps } from '../../types';

type PersonCardProps = {
  personInfo: ActorMoviesProps;
};

const imageUrl = import.meta.env.VITE_IMG;

export default function PersonCard({ personInfo }: PersonCardProps) {
  const { id, name, known_for_department, profile_path, known_for } = personInfo;
  return (
    <div>
      <Link to={ `/person/${name.replace(' ', '')}/${id}` }>
        <p>{name}</p>
        <img
          src={ profile_path ? imageUrl + profile_path : '/anonym.png' }
          alt=""
          style={ { maxHeight: 100 } }
        />
        <p>{known_for_department}</p>
        <p>
          {`${known_for[0].title || known_for[0].name} 
        (${known_for[0].release_date?.split('-')[0]
        || known_for[0].first_air_date?.split('-')[0]})`}
        </p>
      </Link>
    </div>
  );
}
