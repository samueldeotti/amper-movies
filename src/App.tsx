import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import Movie from './Pages/Movie/Movie';
import SearchedMovies from './Pages/SearchedMovies/SearchedMovies';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="movie/:id" element={ <Movie /> } />
        <Route path="/genre/:id/:name" element={ <SearchedMovies /> } />
      </Route>
      {/* <Route path='/*' element={ <NotFound /> }></Route> */}
    </Routes>
  );
}

export default App;
