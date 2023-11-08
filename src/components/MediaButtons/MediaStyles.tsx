import styled from 'styled-components';
import Modal from 'react-modal';

export const ButtonsContainer = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & button {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 0 none;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transition: 0.5s;
    }
  }

`;

export const ModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 90%;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.8);
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;
