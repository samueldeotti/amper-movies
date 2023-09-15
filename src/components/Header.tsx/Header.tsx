/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { createSession, getCertainData } from '../../utils';
import { UserTypes } from '../../types';

export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  // const [requestToken, setRequestToken] = useState('');
  const [user, setUser] = useState<UserTypes>({} as UserTypes);

  const [searchParams] = useSearchParams();
  const authToken = searchParams.get('request_token');

  useEffect(() => {
    if (!user.id) {
      const getData = async () => {
        const data = await createSession(authToken as string);
        console.log('entrou aqui');
        setUser(data);
      };
      getData();
      console.log(user);
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
      // setRequestToken(data.request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://ampermovies.surge.sh/`;
    }

    // alert('Você ira ser redirecionado');
    // talvez futuramente colocar uma verificação para ver mesmo se o usuario quer ser redirecionado ou nao
  };

  return (
    <div>
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

      {/* ?redirect_to=http://www.yourapp.com/approved  colocar esse link despois no href do a, para assim que o usuario logar ele volte para a pagina */}
      <button onClick={ handleClick }>{user.id ? user.username : 'Login'}</button>

    </div>
  );
}
