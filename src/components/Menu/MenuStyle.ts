import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavigationDiv = styled.div<{ show: boolean }>`
  top: 0;
  right: 0px;
  z-index: 3;
  width: 150px;
  transition: 0.5s;
  color: ${({ show }) => (show ? '#333;' : '#fff;')};
  ${({ show }) => (show
    ? 'transition: 1s; background-color: #fff;' : 'background-color: transparent;')}
  backdrop-filter: 
  ${window.screenTop > 500 ? '' : 'blur(20px); border-radius: 0 0 0 0;'};
`;

export const MenuIcon = styled.button<{ show: boolean }>`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${window.screenTop > 500 ? '#000' : '#000'};
  padding: 5px 20px;
  border: 0 none;

  &::before {
    margin-right: 10px;
    content: ${({ show }) => (show ? "'Close'" : "'Menu'")};
  }
`;

export const Span = styled.span<{ show: boolean }>`
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
    background-color: ${window.screenTop > 500 ? '#000' : '#000'};
    transform: 0.5s;
    ${({ show }) => (show ? 'transform: rotate(225deg); top: 24px;' : '')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${window.screenTop > 500 ? '#000' : '#000'};
    transition: 0.5s;
    ${({ show }) => (show ? 'transform: rotate(135deg); bottom: 24px;' : '')};
  }
`;

export const NavigationUl = styled.ul`
  position: absolute;
  width: 149.5px;
  display: flex;
  list-style: none;
  flex-direction: column;
`;

export const Li = styled.li<{ show: boolean }>`
  /* height: ${({ show }) => (show ? '40px' : '0')}; */
  position: relative;
  width: 100%;
  background-color: #fff;
  list-style: none;
  transition: 0.5s;
  visibility: ${({ show }) => (show ? 'visible;' : 'hidden;')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: ${({ show }) => (show ? 'translateX(0px);' : 'translateX(250px);')};
  transition-delay: calc(0.1s * var(--i));
  
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
  transition: 0.5s;
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
