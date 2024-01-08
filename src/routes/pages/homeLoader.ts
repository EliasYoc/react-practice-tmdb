import { getDiscover } from "../../services/tmdb/tmdbMovies";

export const homeLoader = async () => {
  const [discoverMovieRes, discoverTvRes] = await Promise.all([
    getDiscover("/movie"),
    getDiscover("/tv"),
  ]);

  if (discoverMovieRes.status !== 200)
    throw new Response(discoverMovieRes.statusText, {
      status: discoverMovieRes.status,
    });

  return {
    discoverMovie: discoverMovieRes.data,
    discoverTv: discoverTvRes.data,
  };
};
