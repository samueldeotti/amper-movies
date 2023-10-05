import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  `;

export const HeaderForm = styled.form<{ show: string }>`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ccc;
  justify-content: center;
  width: 400px;
  border-radius: 8px;
  padding-left: 4px;

  &:focus-within {
    border-radius: ${({ show }) => (show ? '8px 8px 0 0' : '8px')} ;
    outline: none;
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
    width: 1.5px;
    height: 80%;
    border-radius: 20%;
    background-color: #333;
  }
`;

export const LoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
`;

export const Select = styled.select`
  background: transparent;
  padding: 8px;
  font-size: 16px;
  line-height: 1;
  border: none;
  outline: 1px solid #333;
  border-radius: 8px;
  height: 34px;
  /* -webkit-appearance: none; */
  cursor: pointer;

  & option {
    background-color: #333;
    color: white;
  }
`;

export const LoginButton = styled.button`
  font-size: 16px;
  border-radius: 8px;
  color: white;
  background-color: transparent;
  padding: 8px;
  margin: 0 auto;
  width: 100%;
  border: none;
  outline: 1px solid #333;
  cursor: pointer;
`;

export const SearchUl = styled.ul<{ show: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 0 0 8px 8px;
  padding: 8px;
  z-index: 3;
  list-style: none;
  display: ${({ show }) => show};
`;
