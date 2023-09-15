/* eslint-disable react/jsx-closing-tag-location */
import { ProvidersProps } from '../../types';
import WatchProviders from '../WatchProviders/WatchProviders';

type ProvidersCardProps = {
  providers: ProvidersProps;
};

export default function ProvidersCard({ providers }: ProvidersCardProps) {
  return (
    <>
      <WatchProviders options="Flatrate" providers={ providers } type="flatrate" />
      <WatchProviders options="Rent" providers={ providers } type="rent" />
      <WatchProviders options="Buy" providers={ providers } type="buy" />

      {providers.link
        && <p>
          link:
          {' '}
          <a href={ providers.link } target="blanck">TMDB</a>
        </p>}

    </>
  );
}
