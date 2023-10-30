import { ProviderType, ProvidersContainer } from './ProvidersStyle';

/* eslint-disable @typescript-eslint/naming-convention */
type WatchProvidersProps = {
  options: string;
  providers: any;
  type: string;
};

export default function WatchProviders({
  options, providers, type }: WatchProvidersProps) {
  const imageUrl = import.meta.env.VITE_IMG;

  return (
    <ProvidersContainer>
      {providers[type] && <p style={ { fontSize: '1.05rem' } }>{options}</p>}
      <ProviderType>
        {providers[type]?.map((provider: any) => {
          const { provider_name, logo_path } = provider;
          return (
            <div key={ provider_name + type }>
              {provider_name && logo_path && (
                <>
                  <a href={ providers.link } target="_blanck">
                    <img
                      src={ imageUrl + logo_path }
                      alt=""
                      style={ { height: '100px', borderRadius: 20 } }
                    />

                  </a>
                  <p>{provider_name}</p>
                </>
              )}
            </div>
          );
        })}
      </ProviderType>
    </ProvidersContainer>
  );
}
