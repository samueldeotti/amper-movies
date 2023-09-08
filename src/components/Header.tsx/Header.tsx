import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>
        Amper
        <span>Movies</span>
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
        <button type="button">Lupa</button>
      </form>
    </div>
  );
}
