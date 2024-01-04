import { tmdbInstance } from "../../api/clienteTmdb";
import { AxiosRequestConfig } from "axios";

export const getDiscover = (
  pathRest: string = "",
  config: AxiosRequestConfig = {}
) => {
  return tmdbInstance.get(`/discover${pathRest}`, config);
};

interface IgetShowById {
  id?: string;
  showType?:string;
}
export const getShowById = (
  { id, showType = "movie" }: IgetShowById,
  config: AxiosRequestConfig = {}
) => {
  return tmdbInstance.get(`/${showType}/${id}`, config);
};
