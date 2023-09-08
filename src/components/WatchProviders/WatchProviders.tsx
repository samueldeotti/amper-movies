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
    <div>
      {providers.results?.US?.[type] && <p>{options}</p>}
      {providers.results?.US?.[type]?.map((provider: any) => {
        const { provider_name, logo_path } = provider;
        return (
          <div key={ provider_name + type }>
            <div>
              <p>{provider_name}</p>
              <img
                src={ imageUrl + logo_path }
                alt=""
                style={ { height: '100px', borderRadius: 20 } }
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}
