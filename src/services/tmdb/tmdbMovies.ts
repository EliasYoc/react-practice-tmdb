import { tmdbInstance } from "../../api/clienteTmdb"
import { AxiosRequestConfig } from "axios"

export const getDiscover = (pathRest: string = "", config: AxiosRequestConfig = {}) => {
  return tmdbInstance.get(`/discover${pathRest}`, config)
}

export const getMovieDetailsById = (pathRest: string = "", config: AxiosRequestConfig = {}) => {
  return tmdbInstance.get(`${pathRest}`, config)
}