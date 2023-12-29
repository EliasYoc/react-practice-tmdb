import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetailsById } from "../../services/tmdb/tmdbMovies";
import PageCover from "../../components/PageCover";
import { ConfigContext } from "../../context/ConfigurationContext";
import { MainSection } from "./style";
import { formatDate } from "../../utils/helper";

const MovieDetails = () => {
  const { id } = useParams();
  const { tmdbConfigurationDetails } = useContext(ConfigContext);

  const { images = {} } = tmdbConfigurationDetails || {};
  const [movieDetails, setMovieDetails] = useState(null);
  const formatedReleaseDateRef = useRef<string>();
  useEffect(() => {
    // aprender a usar useEffect de la nueva version de react
    const getMovie = async () => {
      try {
        const res = await getMovieDetailsById(id);
        console.log(res.data);
        setMovieDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
    return () => { };
  }, [id]);

  if (movieDetails) {
    formatedReleaseDateRef.current = formatDate(
      navigator.language,
      { year: "numeric", month: "short", day: "numeric" },
      new Date(movieDetails?.release_date)
    );
  }

  return (
    <MainSection>
      <PageCover
        srcPoster={`${images.base_url}${images.poster_sizes && images.poster_sizes[4]
          }${movieDetails?.poster_path}`}
        srcBackdrop={`${images.base_url}${images.backdrop_sizes[0]}${movieDetails?.backdrop_path}`}
        id={id}
        title={movieDetails?.title}
        releaseDate={formatedReleaseDateRef.current}
        overview={movieDetails?.overview}
        average={movieDetails?.vote_average}
      />
      MovieOverview
    </MainSection>
  );
};

export default MovieDetails;
