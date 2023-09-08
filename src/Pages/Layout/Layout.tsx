import { Outlet } from 'react-router-dom';
import Header from '../../components/Header.tsx/Header';
import NavMenu from '../../components/NavMenu/NavMenu';

export default function Layout() {
  return (
    <>
      <Header />
      <main style={ { display: 'flex' } }>
        <NavMenu />
        <Outlet />
      </main>
    </>
  );
}
