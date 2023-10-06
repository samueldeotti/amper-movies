import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import Movie from './Pages/Movie/Movie';
import SearchedMovies from './Pages/SearchedMovies/SearchedMovies';
import Person from './Pages/Person/Person';
import LoggedPages from './Pages/LoggedPages/LoggedPages';
import Genres from './components/Genres/Genres';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="movie/:id" element={ <Movie /> } />
        <Route path="/genre/:id/:name" element={ <SearchedMovies /> } />
        <Route path="/search?" element={ <SearchedMovies /> } />
        <Route path="/person/:name/:id" element={ <Person /> } />
        <Route path="/movies/favorite" element={ <LoggedPages /> } />
        <Route path="/movies/watchlist" element={ <LoggedPages /> } />
        <Route path="/movies/rated" element={ <LoggedPages /> } />
        <Route path="/genres" element={ <Genres /> } />

      </Route>
      {/* <Route path='/*' element={ <NotFound /> }></Route> */}
    </Routes>
  );
}

export default App;
