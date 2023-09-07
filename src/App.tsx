import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
      </Route>
      {/* <Route path='/*' element={ <NotFound /> }></Route> */}
    </Routes>
  );
}

export default App;
