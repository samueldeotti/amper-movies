import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavigationDiv = styled.div<{ show: boolean }>`
  top: 0;
  right: 0px;
  z-index: 3;
  width: 9.4rem;
  color: ${({ show }) => (show ? '#333;' : '#fff;')};
  ${({ show }) => (show
    ? 'background-color: #fff;' : 'background-color: transparent;')}
  backdrop-filter: blur(40px);
  border-radius: ${({ show }) => (show ? '0' : '8px')};
`;

export const MenuIcon = styled.button<{ show: boolean, height: boolean }>`
  text-shadow: ${({ height }) => (!height ? 'black 0.1em 0.1em 0.1em' : 'none')};
  position: relative;
  top: 0;
  left: 0;
  width: 85%;
  height: 32px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ height, show }) => (height && !show ? '#000' : '#fff')};
  padding: 5px 20px;
  border: 0 none;

  &::before {
    margin-right: 10px;
    content: ${({ show }) => (show ? "'Close'" : "'Menu'")};
  }
`;

export const Span = styled.span<{ show: boolean, height: boolean }>`
  position: relative;
  width: 20px;
  height: 50px;
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ height, show }) => (height || show ? '#000' : '#fff')};
    transform: 0.5s;
    ${({ show }) => (show ? 'transform: rotate(225deg); top: 24px;' : '')};
    transition: transform 0.3s, background-color 0.5s;
    box-shadow: ${({ height }) => (!height ? '0 0 0 1px rgba(0, 0, 0, 0.3)' : 'none')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ height, show }) => (height || show ? '#000' : '#fff')};
    transition: 0.5s;
    ${({ show }) => (show ? 'transform: rotate(135deg); bottom: 24px;' : '')};
    box-shadow: ${({ height }) => (!height ? '0 0 0 1px rgba(0, 0, 0, 0.3)' : 'none')};
  }
`;

export const NavigationUl = styled.ul`
  position: absolute;
  width: 9.4rem;
  display: flex;
  list-style: none;
  flex-direction: column;
`;

export const Li = styled.li<{ show: boolean }>`
  /* height: ${({ show }) => (show ? '40px' : '0')}; */
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: relative;
  width: 100%;
  background-color: #fff;
  list-style: none;
  transition: 0.5s;
  visibility: ${({ show }) => (show ? 'visible;' : 'hidden;')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: ${({ show }) => (show ? 'translateX(0px);' : 'translateX(250px);')};
  transition-delay: calc(0.07s * var(--i));
`;

export const LoginButton = styled.a`
  padding: 0 15px;
  position: relative;
  text-decoration: none;
  display: block;
  height: 40px;
  background-color: #fff;
  color: #000;
  transition: 0.5s;
  cursor: pointer;
  border: 0 none;
  width: 100%;

  &:hover {
    background-color: #ccc;
    color: #f6f6f6;
    transition: 0;
  }
`;

export const NavigationText = styled.p`
  padding: 0 5px;
  height: 30px;
`;

export const LoggedButton = styled(Link)`
  padding: 0 15px;
  position: relative;
  text-decoration: none;
  display: block;
  height: 45px;
  background-color: #fff;
  color: #000;
  transition: 0.5s;
  cursor: pointer;
  border: 0 none;
  width: 100%;

  &:hover {
    background-color: #ccc;
    color: #f6f6f6;
    transition: 0;
  }
`;
