import { tmdbInstance } from "../../api/clienteTmdb";
import { AxiosRequestConfig } from "axios";

export const getDiscover = (
  pathRest: string = "",
  config: AxiosRequestConfig = {}
) => {
  return tmdbInstance.get(`/discover${pathRest}`, config);
};

interface IGetShowById {
  id?: string;
  mediaType?: string;
  pathRest?: string;
}
export const getShowById = (
  { id, mediaType = "movie", pathRest }: IGetShowById,
  config: AxiosRequestConfig = {}
) => {
  return tmdbInstance.get(`/${mediaType}/${id}${pathRest?pathRest:""}`, config);
};
