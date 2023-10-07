import styled from 'styled-components';

export const PopularDiv = styled.div`
  position: relative;
  top: 25vh;
  display: flex;
  align-items: end;
  justify-content: center;
  width: 100vw;
  height: 500px;
  overflow-y: visible;
  overflow-x: hidden;
`;

export const CardContainer = styled.div`
  cursor: pointer;
  position: relative;
  bottom: 80px;
  margin: 0 20px;
`;

export const CardImage = styled.img<{ selected: boolean }>`
  transition: .5s;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  height: ${({ selected }) => (selected ? '384px' : '180px')};
  width: ${({ selected }) => (selected ? '260px' : '124px')};
  /* object-fit: cover; */
  bottom: 0;
  left: 0;
  /* transform: scale(0.8, 1); */
`;

export const CardButton = styled.button`
position: absolute;
bottom: 10%;
left: 50%;
background-color: #87080D;
/* background-color: transparent; */
/* backdrop-filter: blur(20px); */
border: 0 none;
font-size: 16px;
padding: 12px;
cursor: pointer;
border-radius: 6px;
transform: translate(-50%, -50%);
`;

export const Background = styled.section<{ image: string }>`
  height: 90vh;
  position: absolute;
  z-index: -1;
  transition: 0.5s;
  background-image: url(${({ image }) => image});
  background-position: top center;
  background-repeat: no-repeat; 
  background-size: cover;
  width: 100vw;
`;
