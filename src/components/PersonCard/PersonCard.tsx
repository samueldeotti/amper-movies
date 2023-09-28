import { Link } from 'react-router-dom';

type PersonCardProps = {
  id: number;
  name: string;
  know_for: string;
  profile_path: string;
};

const imageUrl = import.meta.env.VITE_IMG;

export default function PersonCard({ id, name, know_for,
  profile_path }: PersonCardProps) {
  return (
    <div>
      <Link to={ `/person/${name.replace(' ', '')}/${id}` }>
        <p>{name}</p>
        <img
          src={ profile_path ? imageUrl + profile_path : '/anonym.png' }
          alt=""
          style={ { maxHeight: 100 } }
        />
        <p>{know_for}</p>

      </Link>
    </div>
  );
}
