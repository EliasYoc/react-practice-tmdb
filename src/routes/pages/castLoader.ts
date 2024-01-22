import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { getShowById } from "../../services/tmdb/tmdbMovies";

interface IPathTvMovie {
  [key: string]: string;
  // movie: string;
  // tv: string;
}


export const CastLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const { id, mediaType = "movie" } = params;
  const pathForTvOrMovie: IPathTvMovie = {
    movie: "/credits",
    tv: "/aggregate_credits",
  };

  const teamRes = await getShowById({
    id,
    mediaType,
    pathRest: pathForTvOrMovie[mediaType],
  });

  if (teamRes.status !== 200)
    throw new Response(teamRes.statusText, {
      status: teamRes.status,
    });

  return {
    team: teamRes.data,
  };
};
