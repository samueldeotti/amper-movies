import styled from 'styled-components';

const shadow = 'black 0.1em 0.1em 0.1em;';

export const HeaderStyled = styled.header<{ show: boolean, path: string }>`
  position: ${({ path }) => (path === '/' ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 3;
  transition: 0.5s;
  color: #fff;
  background-color: ${({ show }) => (show ? '#fff' : 'transparent')};
  padding: ${({ show }) => (show ? '30px 4%' : '50px 4%')};
`;

export const Logo = styled.h1<{ show: boolean }>`
  font-size: 32px;
  text-shadow: ${({ show }) => (!show ? 'black 0.1em 0.1em 0.2em' : 'none')};
  color: ${({ show }) => (show ? '#333' : '#fff')};
`;

export const HeaderForm = styled.form<{ show: boolean, search: string }>`
  position: relative;
  display: flex;
  align-items: center;
  ${({ show }) => (show ? 'background-color: #f6f6f6' : 'backdrop-filter: blur(40px)')};
  background-color: ${({ show }) => (!show ? 'rgba(0, 0, 0, 0.05)' : 'transparent')};
  outline: ${({ show }) => (!show ? 'none' : '1px solid rgba(0, 0, 0, 0.7)')};
  justify-content: center;
  width: 400px;
  border-radius: 8px;
  padding-left: 4px;
  transition: 0.5s;
  /* outline: 1px solid rgba(255,255,255,0.2); */

  &:focus-within {
    border-radius: ${({ search }) => (search ? '8px 8px 0 0' : '8px')} ;
    outline: none;
    transition: 0.5s;
  }
  &:not(:focus-within) {
    transition: 0.3s;
    border-radius: 8px;
  }
`;

export const HeaderInput = styled.input<{ show: boolean }>`
  color: ${({ show }) => (show ? '#333' : '#fff')};
  /* text-shadow: ${({ show }) => (!show ? shadow : 'none')}; */
  
  border: none;
  min-width: 80%;
  padding: 8px;
  margin-right: 10px;
  background-color: transparent;

  &::placeholder {
    color: ${({ show }) => (!show ? '#fff' : '#000')};
    text-shadow: ${({ show }) => (!show ? shadow : 'none')};
  }

  &:focus {
    outline: none;
  }
`;

export const HeaderButton = styled.button<{ show: boolean }>`
  background-color: transparent;
  min-height: 100%;
  margin: 0 auto;
  color: ${({ show }) => (!show ? '#fff' : '#000')};
  text-shadow: ${({ show }) => (!show ? shadow : 'none')};
  width: 100%;
  border: none;
  cursor: pointer;

  &::before {
    content: '';
    top: 10%;
    position: absolute;
    display: block;
    width: 1px;
    height: 80%;
    border-radius: 20%;
    background-color: #333;
  }
`;

export const SearchUl = styled.ul<{ show: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(22, 22, 22, 1);
  border-radius: 0 0 8px 8px;
  padding: 8px;
  z-index: 3;
  list-style: none;
  transition: 0.5s;
  visibility: ${({ show }) => show};
  opacity: ${({ show }) => (show === 'visible' ? '1' : '0')};
`;

export const SearchLi = styled.li`
  padding: 8px;
  border-radius: 28px;
  cursor: pointer;
  transition: 0.3s;
  /* margin-bottom: 4px; */
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
