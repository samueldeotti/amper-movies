/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { createSession, getCertainData, getSearched } from '../../utils';
import { UserTypes } from '../../types';
import { HeaderStyled, Select, SearchUl,
  HeaderForm, HeaderInput, HeaderButton, LoginDiv, LoginButton } from './style';
import MovieCard from '../MovieCard/MovieCard';
import PersonCard from '../PersonCard/PersonCard';

export default function Header() {
  const { id } = useParams();
  let savedSearch = JSON.parse(localStorage.getItem('search') || '[]');

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState<UserTypes>(savedUser ? JSON.parse(savedUser) : {});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(savedSearch);
  const [showResults, setShowResults] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const authToken = searchParams.get('request_token');
  const { t, i18n } = useTranslation();

  const imageUrl = import.meta.env.VITE_IMG;

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
  }, [user.id, data, id, search]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!search) return;
    setShowResults(false);
    navigate(`/search?q=${search}`);
  };

  const clearInput = () => setSearch('');

  const saveSearch = (/* movie: any */) => {
    // savedSearch = JSON.parse(localStorage.getItem('search') as string) || [];
    // if (!savedSearch?.find((item: any) => item.id === movie.id)) {
    //   localStorage.setItem('search', JSON.stringify([...savedSearch, movie]));
    // }
    // savedSearch = JSON.parse(localStorage.getItem('search') as string);
    clearInput();
    setData([]);
  };

  const handleLanguage = (value: string) => {
    localStorage.setItem('language', `${value}-${value === 'en' ? 'US' : 'BR'}`);
    i18n.changeLanguage(value);
    window.location.reload();
  };

  const hideSavedSearch = () => {
    setTimeout(async () => {
      setShowResults(false);
      setData([]);
      setIsLoading(true);
    }, 100);
  };

  const showSavedSearch = () => {
    setShowResults(true);
    if (search) {
      setTimeout(async () => {
        const { movie, people } = await getSearched(search as string);
        const sortedData = [movie, people].flat()
          .sort((a, b) => b.popularity - a.popularity);
        setData(sortedData);
        setIsLoading(false);
      }, 500);
    } else {
      savedSearch = JSON.parse(localStorage.getItem('search') as string) || [];
      setData(savedSearch);
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setIsLoading(true);
    setTimeout(async () => {
      const { movie, people } = await getSearched(event.target.value as string);
      const sortedData = [movie, people].flat()
        .sort((a, b) => b.popularity - a.popularity);
      setData(sortedData);
      setIsLoading(false);
    }, 500);
    setShowResults(true);
    if (event.target.value === '') showSavedSearch();
  };

  const handleClick = async () => {
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

  return (
    <HeaderStyled>
      <h1>
        <Link to="/" onClick={ clearInput }>
          Amper
          <span>Movies</span>
        </Link>
      </h1>
      <HeaderForm action="" onSubmit={ submit } show={ search }>
        <HeaderInput
          type="text"
          placeholder={ t('search.search') }
          value={ search }
          onBlur={ hideSavedSearch }
          onFocus={ showSavedSearch }
          onChange={ handleChange }
        />
        <HeaderButton type="submit">Lupa</HeaderButton>
        {showResults
        && (
          <SearchUl show={ search ? 'block' : 'none' }>
            {isLoading && <li>Loading...</li>}
            {!isLoading && !!data.length ? data.slice(0, 8).map((movie: any) => (
              <li key={ movie.id } onClick={ saveSearch }>
                {movie.title
                  ? <MovieCard movie={ movie } /> : <PersonCard personInfo={ movie } />}
              </li>
            )) : !isLoading && <li>{t('search.noResults')}</li>}
          </SearchUl>
        )}
      </HeaderForm>

      <LoginDiv>
        <Select
          name=""
          id=""
          onChange={ ({ target }) => handleLanguage(target.value) }
          value={ i18n.language }
        >
          <option value="en">
            en
          </option>
          <option value="pt">
            pt
          </option>
        </Select>
        {user.id ? (
          <div onClick={ () => setMenuVisible(!isMenuVisible) }>
            <p>{user.username}</p>
            {user.avatar.tmdb.avatar_path ? (
              <img
                src={ user.avatar.tmdb.avatar_path + imageUrl }
                alt="user avatar"
              />
            ) : <BsFillPersonFill />}
            {isMenuVisible && (
              <ul>
                <li><Link to="/movies/favorite">{t('header.favorites')}</Link></li>
                <li><Link to="/movies/watchlist">{t('header.watchlist')}</Link></li>
                <li><Link to="/movies/rated">{t('header.rated')}</Link></li>
                <li><a href={ `https://www.themoviedb.org/u/${user.username}` } target="_blanck">{t('header.profile')}</a></li>
                <li><button onClick={ handleLogOut }>{t('header.logout')}</button></li>
              </ul>
            )}
          </div>
        ) : (<LoginButton onClick={ handleClick }>Login</LoginButton>)}
      </LoginDiv>

    </HeaderStyled>
  );
}
