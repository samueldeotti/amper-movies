import styled from 'styled-components';

export const ProvidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  gap: 0.2rem;
`;

export const ProviderType = styled.div`
  align-self: flex-start;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 0.6rem;

  & div {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 0.4rem;

    & p {
      text-align: center;
      max-width: 6rem;
      line-height: 1.2rem;
    }
  }
`;
