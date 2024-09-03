import { useLoaderData } from "react-router-dom";
import HomeMoviesTvList from "./components/HomeMoviesTvList";
import { IDiscoverMoviesSeries } from "../../types";

const Home = () => {
  const { discoverMovie, discoverTv } = useLoaderData() as {
    discoverMovie: IDiscoverMoviesSeries;
    discoverTv: IDiscoverMoviesSeries;
  };

  return (
    <main>
      <HomeMoviesTvList movieTvList={discoverMovie.results} />
      <HomeMoviesTvList movieTvList={discoverTv.results} />
    </main>
  );
};

export default Home;
