import styled from 'styled-components';

export const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

export const MovieTitle = styled.h2`
  font-size: 2.5rem;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  height: 100%;
  width: 50%;
`;

export const ImagesContainer = styled.div`
 display: flex; 
 align-items: center; 
 justify-content: center; 
 width: 100%; 
 gap: 10px;
`;

export const MovieImage = styled.img`
  height: 40.5em; 
  width: 380px;
`;

export const TimeContainer = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 0.8rem;
  font-size: 1.2rem;
`;

export const GenresList = styled.ul`
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: 0.8rem;
`;

export const Genre = styled.li`
  margin: 8px 0;
  font-size: 0.9rem;
  border: 1px solid #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 2rem;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    background-color: #fff;
    color: #000;
  }
`;

export const DecriptionContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  gap: 0.8rem;
  justify-content: flex-start;
  align-items: flex-start;
  
`;

export const MovieDescription = styled.p`
  width: 100%;
  max-width: calc(90% - 4px);
  text-align: justify;
`;

export const DirectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & span {
    font-weight: bold;
  }
  & p {
    position: relative;
  }

  & span::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: 0;
    width: calc(10.2rem);
    height: 1px;
    background-color: #fff;
  }

  & :nth-child(1) span::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 0;
    width: calc(10.2rem);
    height: 1px;
    background-color: #fff;
  }


`;

export const WhereWatchText = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;
