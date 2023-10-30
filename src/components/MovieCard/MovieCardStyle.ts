import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MovieContainer = styled(Link)<{ search: boolean }>`
  margin: 20px 20px 20px 10px;
  position: relative;
  ${({ search }) => (search ? 'width: 200px;' : 'min-width: 18rem;')} 
  width: 18rem;
  height: 26rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: block;

  &:hover > .poster::before {
    bottom: 0;
  }

  &:hover > .poster::before > img {
    transform: translateY(3rem);
    filter: blur(5px);
  }

  &:hover > .details {
    bottom: 0;
  }

`;

export const CardPoster = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  user-select: none;

  &::before { 
    content: '';
    position: absolute;
    bottom: -180px;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgb(7, 7, 7) 50%, transparent);
    transition: 0.5s;
    z-index: 1;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  transition: 0.5s;
`;

export const CardInfo = styled.div`
  position: absolute;
  width: 100%;
  bottom: -145px;
  left: 0;
  padding: 1rem;
  z-index: 2;
  transition: 0.5s;
`;

export const CardTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  line-height: normal;
  margin-bottom: 0.4rem;
  margin-top: 0.6rem;
`;

export const Director = styled.h3`
  font-size: 0.8em;
  color: #fff;
`;

export const RatingDiv = styled.div`
  position: relative;
  padding: 0.4em 0;
  display: flex;
  align-items: center;
`;

export const ReleaseSpan = styled.span`
  color: #f7f406;
  margin-right: 0.6em;
`;

export const StarsDiv = styled.div`
  position: relative;
  display: inline-block;
  font-size: 1em;

  & span {
    color: #f7f406;
    font-size: 1.1rem;
  }
`;

export const StarsSpan = styled.span`
  color: #f7f406;
  background-color: transparent;
  font-size: 1em;
`;

export const RatingSpan = styled.span`
  color: #fff;
  margin-left: 0.8em;
`;

export const TagsDiv = styled.div`
  position: relative;
  margin-top: 0.4rem;
`;

export const TagsSpan = styled.span`
  margin-right: 0.4rem;
  padding: 0.3rem 0.5rem;
  color: #fff;
  border-radius: 0.3rem;
  background-color: rgb(133, 6, 6);

  &:nth-child(2) {
    background-color: #0b3770;
  }
`;

export const MovieDetails = styled.div`
  color: #fff;
  height: 50px;
  overflow: hidden;
  margin-top: 20px;
`;

export const MovieCast = styled.div`
  position: relative;

  & > h4 {
    color: #fff;
    margin-top: 10px;
  }
`;

export const CastUl = styled.ul`
  position: relative;
  display: flex;
  margin-top: 10px;
`;

export const CastLi = styled.li`
  list-style: none;
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid #fff;
`;

export const CastImage = styled.img`
  max-width: 100%;
`;

export const SearchDiv = styled(Link)<{ list: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ list }) => (list ? '80px' : '100px')}; 
  max-width: ${({ list }) => (list ? '100%' : '40%')}; 
  margin: 6px 6px 6px ${({ list }) => (list ? '2px' : '20px')};
  & img {
    border-radius: ${({ list }) => (list ? '20px' : '10px')};
    width: 60px;
    margin-left: 0px;
  }
`;

export const SearchInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  overflow: hidden;

  & p {
    width: 500px;
    max-height: 22px;
    overflow: hidden;
  }

  & p:nth-child(1) {
    font-size: 1em;
    font-weight: bold;
  }
`;
