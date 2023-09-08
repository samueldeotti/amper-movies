import axios from 'axios';

export const TOKEN = import.meta.env.VITE_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE;
const searchUrl = import.meta.env.VITE_SEARCH;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const authFetch = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TOKEN,
    language: 'en-US',
  },
  // headers: {
  //   accept: 'application/json',
  //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzVhNmE5ZDkwY2U1ZGQ5OWUwMjlkY2E0NzE0MDU4OCIsInN1YiI6IjY0YzUxZjlmZWVjNWI1MDBmZjUxOWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92Irg1v4yRuz_sYP3AgPwhc55fW13os6y4eACvi7lEA',
  // },
});

const getPopularMovies = async () => {
  const { data } = await authFetch.get('movie/popular');
  return data;
};
const getTrending = async () => {
  const { data } = await authFetch.get('trending/movie/day');
  return data;
};
const getUpcoming = async () => {
  const { data } = await authFetch.get('movie/upcoming');
  return data;
};

const getTopRated = async () => {
  const { data } = await authFetch.get('movie/top_rated');
  return data;
};

const getAllGenres = async () => {
  const { data } = await authFetch.get('genre/movie/list');
  return data;
};

const getByGenre = async (id: string) => {
  const { data } = await authFetch.get(`discover/movie?with_genres=${id}`);
  return data;
};
const getByMovie = async (id: string) => {
  const { data } = await authFetch.get(`movie/${id}`);
  return data;
};

const getProviders = async (id:string) => {
  const { data } = await authFetch.get(`movie/${id}/watch/providers`);
  return data;
};

export { getPopularMovies,
  getTrending,
  getUpcoming, getTopRated, getAllGenres, getByGenre, getByMovie, getProviders };
