import axios from "axios";

export const tmdbInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL_TMDB,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN_TMDB}`,
  }
})
