import styled from 'styled-components';

export const Background = styled.section<{ image: string }>`
  height: 85vh;
  /* position: absolute; */
  z-index: -1;
  background-image: url(${({ image }) => image});
  background-position: top center;
  background-repeat: no-repeat; 
  background-size: cover;
  width: 100vw;
`;
