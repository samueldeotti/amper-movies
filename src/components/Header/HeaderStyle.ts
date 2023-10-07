import styled from 'styled-components';

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
  color: ${({ show }) => (show ? '#333' : '#fff')};
`;

export const HeaderForm = styled.form<{ show: boolean, search: string }>`
  position: relative;
  display: flex;
  align-items: center;
  ${({ show }) => (show ? 'background-color: #f6f6f6' : 'backdrop-filter: blur(20px)')};
  justify-content: center;
  width: 400px;
  border-radius: 8px;
  padding-left: 4px;
  /* outline: 1px solid #fff; */
  transition: 0.5s;

  &:focus-within {
    border-radius: ${({ search }) => (search ? '8px 8px 0 0' : '8px')} ;
    outline: none;
    transition: .3s;
  }
  &:not(:focus-within) {
    transition: 0.3s;
    border-radius: 8px;
  }
`;

export const HeaderInput = styled.input`
  color: black;
  border: none;
  min-width: 80%;
  padding: 8px;
  margin-right: 10px;
  background-color: transparent;


  &:focus {
    outline: none;
  }
`;

export const HeaderButton = styled.button`
  background-color: transparent;
  min-height: 100%;
  margin: 0 auto;
  color: #333;
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
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 0 0 8px 8px;
  padding: 8px;
  z-index: 3;
  list-style: none;
  transition: .5s;
  visibility: ${({ show }) => show};
  opacity: ${({ show }) => (show === 'visible' ? '1' : '0')};
`;

export const SearchLi = styled.li`
display: flex;
align-items: center;
justify-content: center;
  padding: 8px;
  border-radius: 28px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
