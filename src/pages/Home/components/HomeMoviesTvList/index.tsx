import { useContext } from "react";
import MovieCard from "../../../../components/MovieCard";
import { HomeMovies } from "./styles";
import { ConfigContext } from "../../../../context/ConfigurationContext";
import { IMovieSerieMiniDetail } from "../../../../types";
interface IHomeProps {
  movieTvList: IMovieSerieMiniDetail[];
}
const HomeMoviesTvList = ({ movieTvList }: IHomeProps) => {
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const { images } =
    tmdbConfigurationDetails || {};


  return (
    <HomeMovies>
      {movieTvList.map((movieOrTv) => (
        <MovieCard
          key={movieOrTv.id}
          id={movieOrTv.id}
          description={movieOrTv.overview}
          releaseDate={movieOrTv.release_date || movieOrTv.first_air_date}
          src={`${images?.base_url}${images?.poster_sizes[2]}${movieOrTv.poster_path}`}
          backdropSrc={`${images?.base_url}${images?.backdrop_sizes[0]}${movieOrTv.backdrop_path}`}
          average={movieOrTv.vote_average}
          title={movieOrTv.title || movieOrTv.name}
          mediaType={movieOrTv.release_date ? "movie" : "tv"}
        />
      ))}
    </HomeMovies>
  );
};

export default HomeMoviesTvList;
