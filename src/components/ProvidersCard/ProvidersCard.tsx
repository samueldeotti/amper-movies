/* eslint-disable react/jsx-closing-tag-location */
import WatchProviders from '../WatchProviders/WatchProviders';

export default function ProvidersCard({ providers }: any) {
  return (
    <>
      <WatchProviders options="Flatrate" providers={ providers } type="flatrate" />
      <WatchProviders options="Rent" providers={ providers } type="rent" />
      <WatchProviders options="Buy" providers={ providers } type="buy" />

      {providers.results?.US?.link
        && <p>
          link:
          {' '}
          <a href={ providers.results.US.link } target="blanck">TMDB</a>
        </p>}

    </>
  );
}
