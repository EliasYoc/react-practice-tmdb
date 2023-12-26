import { AxiosRequestConfig } from "axios";
import { tmdbInstance } from "../../api/clienteTmdb";

export const getConfigurationDetails = (pathRest: string = "", config: AxiosRequestConfig = {}) => {
  return tmdbInstance.get(`/configuration${pathRest}`, config)
}