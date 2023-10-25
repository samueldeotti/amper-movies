/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { getSearched } from '../../utils';
import {
  HeaderStyled, SearchUl, SearchLi,
  HeaderForm, HeaderInput, HeaderButton, Logo,
} from './HeaderStyle';
import MovieCard from '../MovieCard/MovieCard';
import PersonCard from '../PersonCard/PersonCard';
import Menu from '../Menu/Menu';

export default function Header() {
  // const { id } = useParams();
  let savedSearch = JSON.parse(localStorage.getItem('search') || '[]');

  const { pathname } = window.location;

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(savedSearch);
  const [showResults, setShowResults] = useState(false);
  const [showMenu, setshowMenu] = useState(false);

  const { t, i18n } = useTranslation();
  console.log(i18n.language);

  const handleScroll = () => {
    const { scrollY } = window;
    if (pathname.split('/').length > 2 || pathname.includes('search')) return;
    if (scrollY > 500) setshowMenu(true);
    else setshowMenu(false);
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    if (pathname.split('/').length > 2 || pathname.includes('search')) setshowMenu(true);
    else setshowMenu(false);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, i18n.language]);

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

  return (
    <>
      <HeaderStyled show={ showMenu } path={ pathname }>
        <Logo show={ showMenu }>
          <Link to="/" onClick={ clearInput }>
            Amper
            <span>Movies</span>
          </Link>
        </Logo>
        <HeaderForm action="" onSubmit={ submit } search={ search } show={ showMenu }>
          <HeaderInput
            type="text"
            placeholder={ t('search.search') }
            value={ search }
            onBlur={ hideSavedSearch }
            onFocus={ showSavedSearch }
            onChange={ handleChange }
            show={ showMenu }
          />
          <HeaderButton type="submit" show={ showMenu }><AiOutlineSearch /></HeaderButton>
          {showResults
                    && (
                      <SearchUl show={ search ? 'visible' : 'hidden' }>
                        {isLoading && (
                          <SearchLi
                            style={ { textAlign: 'center' } }
                          >
                            Loading...
                          </SearchLi>)}
                        {!isLoading && !!data.length
                          ? data.slice(0, 8).map((movie: any) => (
                            <SearchLi key={ movie.id } onClick={ saveSearch }>
                              {movie.title
                                ? <MovieCard movie={ movie } ul search />
                                : <PersonCard personInfo={ movie } ul />}
                            </SearchLi>
                          )) : !isLoading && <SearchLi>{t('search.noResults')}</SearchLi>}
                      </SearchUl>
                    )}
        </HeaderForm>
        <Menu />
      </HeaderStyled>
      {/* <Background /> */}
    </>
  );
}
