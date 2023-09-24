/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Link } from 'react-router-dom';
import { CastDetailsProps } from '../../types';

type CastCardProps = {
  cast: CastDetailsProps
};

export default function CastCard({ cast }: CastCardProps) {
  const imageUrl = import.meta.env.VITE_IMG;
  const { id, profile_path, name, character } = cast;

  return (
    <div>
      <Link to={ `/person/${name.replace(' ', '')}/${id}` }>
        <img
          src={ profile_path ? imageUrl + profile_path : '/anonym.png' }
          alt="person"
          style={ { maxWidth: 200 } }
        />
        <p>{name}</p>
        <p>{character}</p>
      </Link>
    </div>
  );
}
