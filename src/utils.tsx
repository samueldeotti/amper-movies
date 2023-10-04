/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { ActorMoviesProps, MovieDetailsProps, MovieProps } from './types';

export const TOKEN = import.meta.env.VITE_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE;
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const savedUser = JSON.parse(localStorage.getItem('user') as string) || {};
const savedLanguage = localStorage.getItem('language') || navigator.languages[0];

const headers = {
  accept: 'application/json',
  'content-type': 'application/json;charset=utf-8',
  Authorization: AUTHORIZATION,
};

const baseUrl = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TOKEN,
    include_adult: savedUser.include_adult,
    language: savedLanguage,
    // append_to_response: 'images',
    // include_image_language: `${savedLanguage.split('-')[0]},null`,
  },
  headers,
});

const getCertainData = async (url: string) => {
  const { data } = await baseUrl.get(url);
  if (data.results && !url.includes('watch/providers') && !url.includes('upcoming')) {
    return data.results.filter((movie: MovieProps) => movie.backdrop_path && movie.poster_path && movie.overview && movie.title);
  }
  return data;
};

const getHomeMovies = async () => {
  const popularData = await getCertainData('movie/popular');
  const trendingData = await getCertainData('trending/movie/day');
  const upcomingData = await getCertainData('movie/upcoming?primary_release_date.gte=2023-10-01&sort_by=popularity.desc');
  const topRatedData = await getCertainData('movie/top_rated');
  const filterUpcoming = upcomingData.results.filter((movie: MovieProps) => movie.poster_path && movie.overview && movie.title);

  let recentlyMovies = [];
  const seenRecently = JSON.parse(localStorage.getItem('seenRecently') || '[]');
  if (seenRecently.length) {
    recentlyMovies = await Promise.all(seenRecently.reverse().slice(0, 20).map(async (movieId: MovieDetailsProps) => getCertainData(`movie/${movieId}`)));
  }

  return { popularData, trendingData, filterUpcoming, topRatedData, recentlyMovies };
};

const getSearched = async (searchParam:string) => {
  const moviesData = await baseUrl.get(`search/movie?query=${searchParam}`);
  const peopleData = await baseUrl.get(`search/person?query=${searchParam}`);
  return {
    movie: moviesData.data.results.filter((movie: MovieProps) => movie.backdrop_path && movie.poster_path && movie.overview && movie.title && movie.vote_average > 0),
    people: peopleData.data.results.filter((person: ActorMoviesProps) => person.known_for.length && person.profile_path),
  };
};

const getUserData = async (tokenUser: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/account?api_key=${TOKEN}&session_id=${tokenUser}`);
  const data = await response.json();
  return data;
};

const createSession = async (tokenUser: string) => {
  const { data } = await axios.post(`${BASE_URL}authentication/session/new`, JSON.stringify({ request_token: tokenUser }), { headers });
  const userData = await getUserData(data.session_id);
  return userData;
};

const addRating = async (movieId: string, rating: number) => {
  const { data } = await axios.post(`${BASE_URL}movie/${movieId}/rating?`, JSON.stringify({ value: rating }), { headers });
  return data;
};

const deleteRating = async (movieId: number) => {
  const { data } = await axios.delete(`${BASE_URL}movie/${movieId}/rating`, { headers });
  return data;
};

const handleLoggedMovies = async (movieId: string | number, accountId: number, value: boolean, type: string) => {
  const { data } = await axios.post(`${BASE_URL}account/${accountId}/${type}?`, { media_type: 'movie', media_id: movieId, [type]: value }, { headers });
  return data;
};

const getVideos = async (movieId: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TOKEN}&language=en-US`);
  const { results } = await response.json();
  return results.filter((video: any) => video.type !== 'Trailer' && video.site === 'YouTube');
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export { getHomeMovies,
  getSearched, createSession, getUserData, getCertainData, addRating, handleLoggedMovies, customStyles, deleteRating, getVideos };
