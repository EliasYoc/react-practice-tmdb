import { CircularProgressbarWrapper, CoverButtonsContainer, Info, MovieTitle, Overview } from './styles'
import TmdbCircularPtogressBar from '../../../TmbdCircularProgressBar'

interface CardInfoProps {
  title?: string
  releaseDate?: string
  average: number
  overview?: string
}
const MovieSerieCardInfo = ({ title, releaseDate, average, overview }: CardInfoProps) => {
  return (
    <Info>
      <header>
        <MovieTitle>
          {title}
          <span
            style={{
              // inline-block because the other related element is block
              display: "inline-block",
              viewTransitionName: "movie-series-release-date",
            }}
          >
            ({releaseDate})
          </span>
        </MovieTitle>
      </header>
      <CoverButtonsContainer>
        <CircularProgressbarWrapper
          style={{
            viewTransitionName: "show-avg-progress",
            contain: "layout",
          }}
        >
          <TmdbCircularPtogressBar
            strokeWidth={10}
            value={average}
            maxValue={10}
            textSize="1.3rem"
            text={(average * 10)?.toFixed(2)?.toString() + "%"}
          />
        </CircularProgressbarWrapper>
      </CoverButtonsContainer>
      <Overview>{overview}</Overview>
    </Info>
  )
}

export default MovieSerieCardInfo