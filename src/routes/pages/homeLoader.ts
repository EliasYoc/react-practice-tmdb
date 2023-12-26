import { getDiscoverMovie } from "../../services/tmdb/tmdbMovies"

export const homeLoader = async () => {

  const res = await getDiscoverMovie()
  if (res.status !== 200) throw new Response(res.statusText, { status: res.status })
  const discoverMovie = res.data

  return { discoverMovie }
}