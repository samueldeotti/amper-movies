import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ImageDetailsProps, VideoProps } from '../../types';
import { ButtonsContainer, ModalContainer } from './MediaStyles';

type MediaButtonsProps = {
  videos?: VideoProps[] | undefined;
  images: ImageDetailsProps[];
};

export default function MediaButtons({
  videos = [], images }: MediaButtonsProps) {
  const imageUrl = import.meta.env.VITE_IMG;

  const { t } = useTranslation();
  const { pathname } = window.location;
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [isImage, setIsImage] = useState(true);

  const addPosition = () => {
    if (position < (isImage ? images.length : videos.length) - 1) {
      setPosition(position + 1);
    } else setPosition(0);
  };

  const backPosition = () => {
    if (position > 0) setPosition(position - 1);
    else setPosition((isImage ? images.length : videos.length) - 1);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setPosition(0);
    setIsOpen(false);
    setIsImage(true);
  };

  return (
    <ButtonsContainer>
      {pathname.includes('movie')
      && (
        <button
          onClick={ () => {
            setIsImage(false);
            openModal();
          } }
        >
          {`Videos ${videos.length > 99 ? '99+' : videos.length}`}
        </button>
      )}
      <button onClick={ openModal }>
        {`${t('photos')} ${images.length > 99 ? '99+' : images.length}`}
      </button>

      <ModalContainer
        isOpen={ isOpen }
        onRequestClose={ closeModal }
        // style={ customStyles }
        contentLabel="Rate Modal"
        ariaHideApp={ false }
      >
        <button onClick={ closeModal }>X Close</button>
        <div>
          {isImage
            ? <img
                src={ imageUrl + images[position]?.file_path }
                alt=""
                style={ { maxHeight: 800, width: '90%' } }
            />
            : <iframe width="90%" height="800px" src={ `https://www.youtube.com/embed/${videos[position].key}` } title="YouTube video player" frameBorder="0" allow="encrypted-media; gyroscope; picture-in-picture; web-share" />}
        </div>
        <div>
          <button onClick={ backPosition }>{'<'}</button>
          <p>{position + 1}</p>
          <button onClick={ addPosition }>{'>'}</button>
        </div>
      </ModalContainer>

    </ButtonsContainer>
  );
}
