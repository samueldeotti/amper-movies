/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { createSession, getCertainData } from '../../utils';
import { UserTypes } from '../../types';

export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState<UserTypes>(savedUser ? JSON.parse(savedUser) : {});

  const [searchParams] = useSearchParams();
  const authToken = searchParams.get('request_token');

  const imageUrl = import.meta.env.VITE_IMG;

  useEffect(() => {
    if (!user.id) {
      const getData = async () => {
        const data = await createSession(authToken as string);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      };
      getData();
    }
  }, [user.id]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
  };

  const clearInput = () => {
    setSearch('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = async () => {
    if (!user.id) {
      const data = await getCertainData('https://api.themoviedb.org/3/authentication/token/new');
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://ampermovies.surge.sh/`;
    }
    // alert('Você ira ser redirecionado');
    // talvez futuramente colocar uma verificação para ver mesmo se o usuario quer ser redirecionado ou nao
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setUser({} as UserTypes);
    localStorage.removeItem('seenRecently');
    // tentar pensar numa solução mehlor, pq aqui, quando o usario deslogar, nunca mais vai ser possivel ver os filmes que ele ja viu, pois, o user vem da API, mas o seenRecently vem do localstorage

    navigate('/'); // verificar se fica uma melhor opção deixar o usuario na mesma pagina ou redirecionar para a home
  };

  return (
    <header>
      <h1>
        <Link to="/" onClick={ clearInput }>
          Amper
          <span>Movies</span>
        </Link>
      </h1>
      <form action="" onSubmit={ submit }>
        <label htmlFor="">
          <input
            type="text"
            placeholder="Pesquisar"
            value={ search }
            onChange={ handleChange }
          />
        </label>
        <button type="submit">Lupa</button>
      </form>

      {user.id ? (
        <div>
          <details>
            <summary>{user.username}</summary>
            <Link to="/favorites">Favorites Movies</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/ratedmovies">Rated Movies</Link>
            <a href={ `https://www.themoviedb.org/u/${user.username}` } target="_blanck">See Profile</a>
            <button onClick={ handleLogOut }>Log Out</button>
          </details>
          {user.avatar.tmdb.avatar_path ? (
            <img src={ user.avatar.tmdb.avatar_path + imageUrl } alt="user avatar" />
          ) : <BsFillPersonFill />}
        </div>
      ) : (<button onClick={ handleClick }>Login</button>)}

    </header>
  );
}
