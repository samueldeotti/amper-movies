import { Outlet } from 'react-router-dom';
import Header from '../../components/Header.tsx/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
