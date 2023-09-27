import LogedMovie from '../../components/LogedMovies/LogedMovies';

export default function LoggedPages() {
  const { pathname } = window.location;
  if (pathname.includes('rated')) return (<LogedMovie />);
  if (pathname.includes('favorite')) return (<LogedMovie />);
  return (<LogedMovie />);
}
