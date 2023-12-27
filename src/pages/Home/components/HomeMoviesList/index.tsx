import { useContext } from "react";
import MovieCard from "../../../../components/MovieCard";
import { HomeMovies } from "./styles";
import { ConfigContext } from "../../../../context/ConfigurationContext";

const HomeMoviesList = ({ MovieList }) => {
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const { images } =
    tmdbConfigurationDetails || {};


  return (
    <HomeMovies>
      {MovieList.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          description={movie.overview}
          releaseDate={movie.release_date}
          src={`${images.base_url}${images.backdrop_sizes[0]}${movie.poster_path}`}
          average={movie.vote_average}
          title={movie.title}
        />
      ))}
    </HomeMovies>
  );
};

export default HomeMoviesList;
