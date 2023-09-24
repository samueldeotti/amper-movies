/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { MovieDetailsProps, MovieProps } from './types';

export const TOKEN = import.meta.env.VITE_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE;
const SEARCH_URL = import.meta.env.VITE_SEARCH;
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  Authorization: AUTHORIZATION,
};

const baseUrl = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TOKEN,
    include_adult: false,
    language: 'en-US', // fazer com que essa lingua seja responsiva com o q tem salvo no localstorage, fazer com que a pagina também seja responsiva com o q tem salvo no localstorage
  },
});

const searchUrl = axios.create({
  baseURL: SEARCH_URL,
  params: {
    api_key: TOKEN,
    include_adult: false,
    language: 'en-US',
  },
});

const getCertainData = async (url: string) => {
  const { data } = await baseUrl.get(url);
  if (data.results && !url.includes('watch/providers')) {
    return data.results.filter((movie: MovieProps) => movie.backdrop_path && movie.poster_path && movie.overview && movie.title && movie.vote_average > 0);
  }
  return data;
};

const getHomeMovies = async () => {
  const popularData = await getCertainData('movie/popular');
  const trendingData = await getCertainData('trending/movie/day');
  const upcomingData = await getCertainData('movie/upcoming');
  const topRatedData = await getCertainData('movie/top_rated');
  let recentlyMovies = [];

  const seenRecently = JSON.parse(localStorage.getItem('seenRecently') || '[]');
  if (seenRecently.length) {
    recentlyMovies = await Promise.all(seenRecently.map(async (movieId: MovieDetailsProps) => getCertainData(`movie/${movieId}`)));
  }

  return { popularData, trendingData, upcomingData, topRatedData, recentlyMovies };
};

const getMoviesByName = async (searchMovie:string) => {
  const { data } = await searchUrl.get(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&include_adult=false&language=en-US`);
  return data.results.filter((movie: MovieProps) => movie.backdrop_path && movie.poster_path && movie.overview && movie.title && movie.vote_average > 0);
};

const createSession = async (tokenUser: string) => {
  const { data } = await axios.post(`${BASE_URL}authentication/session/new`, JSON.stringify({ request_token: tokenUser }), { headers });
  const userData = await getUserData(data.session_id);
  return userData;
};

const getUserData = async (tokenUser: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/account?api_key=${TOKEN}&session_id=${tokenUser}`);
  const data = await response.json();
  return data;
};

export { getHomeMovies,
  getMoviesByName, createSession, getUserData, getCertainData };
