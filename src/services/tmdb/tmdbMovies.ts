import { tmdbInstance } from "../../api/clienteTmdb"
import { AxiosRequestConfig } from "axios"

export const getDiscoverMovie = (pathRest: string = "", config: AxiosRequestConfig = {}) => {
  return tmdbInstance.get(`/discover/movie${pathRest}`, config)
}

export const getMovieDetailsById = (pathRest: string = "", config: AxiosRequestConfig = {}) => {
  return tmdbInstance.get(`/movie/${pathRest}`, config)
}