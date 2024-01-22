import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getShowById } from "../../services/tmdb/tmdbMovies";
import PageCover from "../../components/PageCover";
import { ConfigContext } from "../../context/ConfigurationContext";
import { MainSection } from "./style";
import { formatDate, mediaQueries } from "../../utils/helper";
import MovieSerieCardInfo from "../../components/PageCover/components/MovieSerieCardInfo";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { IMovieSerieDetail } from "../../types";

interface ReusableMovieShowDetails {
  title?: string;
  releaseDate?: string;
  average: number;
  overview?: string;
}

const MovieDetails = () => {
  const { id, mediaType } = useParams();
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const { state } = useLocation();
  const matchMdScreen = useMediaQuery(mediaQueries.md);

  const { images } = tmdbConfigurationDetails || {};
  const [movieDetails, setMovieDetails] = useState<IMovieSerieDetail | null>(
    null
  );
  const formatedReleaseDateRef = useRef<string>();
  useEffect(() => {
    // aprender a usar useEffect de la nueva version de react
    const getMovie = async () => {
      try {
        const res = await getShowById({ id, mediaType });
        setMovieDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
    return () => { };
  }, [id, mediaType]);

  if (movieDetails) {
    formatedReleaseDateRef.current = formatDate(
      navigator.language,
      { year: "numeric", month: "short", day: "numeric" },
      new Date(movieDetails?.release_date || movieDetails?.first_air_date || 0)
    );
  }

  const reusableMovieShowDetails: ReusableMovieShowDetails = {
    title: state?.title || movieDetails?.title || movieDetails?.name,
    releaseDate: formatedReleaseDateRef.current || state?.releaseDate,
    average: movieDetails?.vote_average || state?.serieMovieAverage,
    overview: movieDetails?.overview,
  };

  return (
    <MainSection>
      <PageCover
        {...reusableMovieShowDetails}
        srcPoster={`${images?.base_url}${images?.poster_sizes && images.poster_sizes[4]
          }${movieDetails?.poster_path}`}
        srcBackdrop={`${images?.base_url}${images?.backdrop_sizes[0]}${movieDetails?.backdrop_path}`}
      />
      <div>
        <main>
          {matchMdScreen && (
            <MovieSerieCardInfo {...reusableMovieShowDetails} />
          )}
        </main>
      </div>
    </MainSection>
  );
};

export default MovieDetails;
