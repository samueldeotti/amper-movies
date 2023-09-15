/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

export const TOKEN = import.meta.env.VITE_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE;
const SEARCH_URL = import.meta.env.VITE_SEARCH;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const baseUrl = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TOKEN,
    include_adult: false,
    language: 'en-US',
  },
  // headers: {
  //   accept: 'application/json',
  //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzVhNmE5ZDkwY2U1ZGQ5OWUwMjlkY2E0NzE0MDU4OCIsInN1YiI6IjY0YzUxZjlmZWVjNWI1MDBmZjUxOWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92Irg1v4yRuz_sYP3AgPwhc55fW13os6y4eACvi7lEA',
  // },
});

const searchUrl = axios.create({
  baseURL: SEARCH_URL,
  params: {
    api_key: TOKEN,
    include_adult: false,
    language: 'en-US',
  },
});

// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzVhNmE5ZDkwY2U1ZGQ5OWUwMjlkY2E0NzE0MDU4OCIsInN1YiI6IjY0YzUxZjlmZWVjNWI1MDBmZjUxOWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92Irg1v4yRuz_sYP3AgPwhc55fW13os6y4eACvi7lEA',
//   },
//   body: JSON.stringify({ request_token: '6667b23f7b5a7d318b1de3158c034672d6ba6ebe' }),
// };

const getPopularMovies = async () => {
  const { data } = await baseUrl.get('movie/popular');
  return data;
};
const getTrending = async () => {
  const { data } = await baseUrl.get('trending/movie/day');
  return data;
};
const getUpcoming = async () => {
  const { data } = await baseUrl.get('movie/upcoming');
  return data;
};

const getTopRated = async () => {
  const { data } = await baseUrl.get('movie/top_rated');
  return data;
};

const getAllGenres = async () => {
  const { data } = await baseUrl.get('genre/movie/list');
  return data;
};

const getByGenre = async (id: string) => {
  const { data } = await baseUrl.get(`discover/movie?with_genres=${id}`);
  return data;
};
const getByMovie = async (id: string) => {
  const { data } = await baseUrl.get(`movie/${id}`);
  return data;
};

const getProviders = async (id:string) => {
  const { data } = await baseUrl.get(`movie/${id}/watch/providers`);
  return data;
};

const getMoviesByName = async (searchMovie:string) => {
  const { data } = await searchUrl.get(`?query=${searchMovie}`);
  return data;
};

const getRequestToken = async () => {
  const { data } = await baseUrl.get('https://api.themoviedb.org/3/authentication/token/new');
  return data;
};

const createSession = async (tokenUser: string) => {
  const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzVhNmE5ZDkwY2U1ZGQ5OWUwMjlkY2E0NzE0MDU4OCIsInN1YiI6IjY0YzUxZjlmZWVjNWI1MDBmZjUxOWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92Irg1v4yRuz_sYP3AgPwhc55fW13os6y4eACvi7lEA',
    },
    body: JSON.stringify({ request_token: tokenUser }),
  });
  const data = await response.json();
  const userData = await getUserData(data.session_id);
  return userData;
};

const getUserData = async (tokenUser: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/account?api_key=${TOKEN}&session_id=${tokenUser}`);
  const data = await response.json();
  return data;
};

export { getPopularMovies,
  getTrending,
  getUpcoming,
  getTopRated,
  getAllGenres, getByGenre,
  getByMovie,
  getProviders,
  getRequestToken, getMoviesByName, createSession, getUserData };
