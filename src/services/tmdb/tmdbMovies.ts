import { tmdbInstance } from "../../api/clienteTmdb";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IDiscoverMoviesSeries } from "../../types";

export const getDiscover = (
  pathRest: string = "",
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<IDiscoverMoviesSeries>> => {
  return tmdbInstance.get<IDiscoverMoviesSeries>(`/discover${pathRest}`, config);
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
