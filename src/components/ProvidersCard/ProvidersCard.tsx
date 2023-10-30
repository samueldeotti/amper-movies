/* eslint-disable react/jsx-closing-tag-location */
import { useTranslation } from 'react-i18next';
import { ProvidersProps } from '../../types';
import WatchProviders from '../WatchProviders/WatchProviders';

type ProvidersCardProps = {
  providers: ProvidersProps;
};

export default function ProvidersCard({ providers }: ProvidersCardProps) {
  const { t } = useTranslation();
  return (
    <>
      <WatchProviders
        options={ t('providers.stream') }
        providers={ providers }
        type="flatrate"
      />
      <WatchProviders
        options={ t('providers.rent') }
        providers={ providers }
        type="rent"
      />
      <WatchProviders options={ t('providers.buy') } providers={ providers } type="buy" />

    </>
  );
}
