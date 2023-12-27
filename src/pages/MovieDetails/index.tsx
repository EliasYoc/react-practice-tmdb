import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetailsById } from "../../services/tmdb/tmdbMovies";
import PageCover from "../../components/PageCover";
import { ConfigContext } from "../../context/ConfigurationContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { tmdbConfigurationDetails } = useContext(ConfigContext);

  const { images = {} } = tmdbConfigurationDetails || {};
  const [movieDetails, setMovieDetails] = useState(null);

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


  return (
    <main>
      <PageCover
        srcPoster={`${images.base_url}${images.poster_sizes && images.poster_sizes[5]
          }${movieDetails?.poster_path}`}
        srcBackdrop=""
        id={id}
        title={movieDetails?.title}
      />
      MovieDetails
    </main>
  );
};

export default MovieDetails;
