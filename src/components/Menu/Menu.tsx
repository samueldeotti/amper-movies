/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { MenuIcon, NavigationDiv, Li, NavigationUl,
  Span, LoginButton, NavigationText, LoggedButton } from './MenuStyle';
import { UserTypes } from '../../types';
import { createSession, getCertainData } from '../../utils';

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [heigth, setHeigth] = useState(false);
  const { t, i18n } = useTranslation();

  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState<UserTypes>(savedUser ? JSON.parse(savedUser) : {});
  const [searchParams] = useSearchParams();
  const authToken = searchParams.get('request_token');
  const imageUrl = import.meta.env.VITE_IMG;

  const handleScroll = () => {
    const { scrollY } = window;
    if (scrollY > 500) setHeigth(true);
    else setHeigth(false);
  };

  const handleLogin = async () => {
    if (!user.id) {
      const token = await getCertainData('https://api.themoviedb.org/3/authentication/token/new');
      window.location.href = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=https://ampermovies.surge.sh/`;
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setUser({} as UserTypes);
    window.location.reload();
  };

  useEffect(() => {
    if (!user.id) {
      const getData = async () => {
        const dataLogin = await createSession(authToken as string);
        setUser(dataLogin);
        localStorage.setItem('user', JSON.stringify(dataLogin));
        window.location.reload();
      };
      getData();
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user.id, authToken]);

  const handleClick = (value: string) => {
    if (value.includes(i18n.language)) return;
    localStorage.setItem('language', value);
    i18n.changeLanguage(value.slice(0, 2));
    window.location.reload();
  };

  return (
    <NavigationDiv show={ showMenu }>
      <MenuIcon
        show={ showMenu }
        height={ heigth }
        onClick={ () => setShowMenu(!showMenu) }
      >
        <Span show={ showMenu } height={ heigth } />
      </MenuIcon>
      <NavigationUl>
        {!user.id && (
          <Li
            style={ { '--i': 0 } as React.CSSProperties }
            show={ showMenu }
          >
            <LoginButton onClick={ handleLogin }>Login</LoginButton>
          </Li>)}
        <Li
          style={ { '--i': 1 } as React.CSSProperties }
          show={ showMenu }
        >
          <NavigationText>{t('languages')}</NavigationText>
        </Li>
        <Li style={ { '--i': 2 } as React.CSSProperties } show={ showMenu }>
          <LoginButton>
            <label htmlFor="en">
              <input
                type="radio"
                name="language"
                id="en"
                onClick={ () => handleClick('en-US') }
                checked={ i18n.language === 'en' }
              />
              en
            </label>
          </LoginButton>
        </Li>
        <Li style={ { '--i': 3 } as React.CSSProperties } show={ showMenu }>
          <LoginButton>
            <label htmlFor="pt">
              <input
                type="radio"
                name="language"
                id="pt"
                onClick={ () => handleClick('pt-BR') }
                checked={ i18n.language === 'pt' }
              />
              pt
            </label>
          </LoginButton>
        </Li>
        <Li style={ { '--i': 4 } as React.CSSProperties } show={ showMenu }>
          <LoggedButton to="/genres">
            {t('logged.genres')}
          </LoggedButton>
        </Li>
        {user.id
        && (
          <>
            <Li
              style={ { '--i': 5 } as React.CSSProperties }
              show={ showMenu }
            >
              <NavigationText>Account</NavigationText>
            </Li>
            <Li
              style={ { '--i': 6 } as React.CSSProperties }
              show={ showMenu }
            >
              <LoginButton href={ `https://www.themoviedb.org/u/${user.username}` } target="_blanck">
                {user?.avatar?.tmdb?.avatar_path ? (
                  <img
                    src={ user.avatar.tmdb.avatar_path + imageUrl }
                    alt="user avatar"
                  />
                ) : (
                  <span style={ { display: 'flex', justifyContent: 'space-between' } }>
                    {user.username || 'User'}
                    <BsFillPersonFill />
                  </span>
                )}
              </LoginButton>
            </Li>
            <Li
              style={ { '--i': 7 } as React.CSSProperties }
              show={ showMenu }
            >
              <LoggedButton to="/movies/favorite">
                {t('header.favorites')}
              </LoggedButton>
            </Li>
            <Li
              style={ { '--i': 8 } as React.CSSProperties }
              show={ showMenu }
            >
              <LoggedButton to="/movies/watchlist">
                {t('header.watchlist')}
              </LoggedButton>
            </Li>
            <Li
              style={ { '--i': 9 } as React.CSSProperties }
              show={ showMenu }
            >
              <LoggedButton to="/movies/rated">
                {t('header.rated')}
              </LoggedButton>
            </Li>
            <Li
              style={ { '--i': 10 } as React.CSSProperties }
              show={ showMenu }
            >
              <LoginButton onClick={ handleLogOut }>
                {t('header.logout')}
              </LoginButton>
            </Li>
          </>
        )}

      </NavigationUl>
    </NavigationDiv>
  );
}
