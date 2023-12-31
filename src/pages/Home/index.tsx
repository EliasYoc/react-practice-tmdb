import { useLoaderData } from "react-router-dom"
import HomeMoviesTvList from "./components/HomeMoviesTvList"


const Home = () => {
  const { discoverMovie, discoverTv } = useLoaderData()
  console.log(discoverMovie, discoverTv)
  return (
    <main style={{ height: "100%" }}>
      <HomeMoviesTvList movieTvList={discoverMovie.results} />
      <HomeMoviesTvList movieTvList={discoverTv.results} />
    </main>
  )
}

export default Home