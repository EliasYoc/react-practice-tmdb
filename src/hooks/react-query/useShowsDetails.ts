import { useQuery } from "@tanstack/react-query";
import { getShowById, IGetShowById } from "../../services/tmdb/tmdbMovies";

const useShowsDetails = <T>({ id, mediaType, pathRest }: IGetShowById) => {
  const result = useQuery({
    queryKey: ["movieDetails", id, mediaType, pathRest],
    queryFn: async (): Promise<T> => {
      const response = await getShowById({ id, mediaType, pathRest });
      return response.data;
    },
  });

  return result;
};

export default useShowsDetails;
