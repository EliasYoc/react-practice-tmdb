import { useLoaderData } from "react-router-dom"
import HomeMoviesList from "./components/HomeMoviesList"


const Home = () => {
  const { discoverMovie } = useLoaderData()

  return (
    <main>
      <HomeMoviesList MovieList={discoverMovie.results} />

    </main>
  )
}

export default Home