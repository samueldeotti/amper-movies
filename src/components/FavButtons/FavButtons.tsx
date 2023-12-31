import { useTranslation } from 'react-i18next';
import { FaStar as Rated, FaRegStar as NotRated } from 'react-icons/fa';
import { FaHeartCirclePlus as Fav, FaHeartCircleXmark as NotFav } from 'react-icons/fa6';
import { BsFillBookmarkPlusFill as Watch,
  BsFillBookmarkXFill as NotWatch } from 'react-icons/bs';
import { Button, ButtonsContainer } from './FavButtosStyle';

type FavButtonsProps = {
  textCondition: boolean;
  modal?: () => void;
  handleLogged?: () => void;
  typeButton: string;
};

export default function FavButtons({ textCondition,
  modal = () => {}, handleLogged = () => {}, typeButton }: FavButtonsProps) {
  const { t } = useTranslation();

  return (
    <ButtonsContainer>
      <p>
        {textCondition
          ? t(`movie.${typeButton}.remove`) : t(`movie.${typeButton}.add`) }
      </p>
      <Button onClick={ typeButton === 'rate' ? modal : handleLogged }>
        {typeButton === 'rate' && (textCondition ? <Rated /> : <NotRated />) }
        {typeButton === 'favorite' && (textCondition ? <NotFav /> : <Fav />) }
        {typeButton === 'watchlist' && (textCondition ? <NotWatch /> : <Watch />) }
      </Button>
    </ButtonsContainer>
  );
}
