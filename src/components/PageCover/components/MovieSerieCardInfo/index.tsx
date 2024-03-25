import {
  CircularProgressbarWrapper,
  CoverButtonsContainer,
  Info,
  MovieTitle,
  Overview,
} from "./styles";
import TmdbCircularPtogressBar from "../../../TmbdCircularProgressBar";
import Button from "../../../Button";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";

interface CardInfoProps {
  title?: string;
  releaseDate?: string;
  average: number;
  overview?: string;
  cardStyle?: CSSProperties;
}
const MovieSerieCardInfo = ({
  title,
  releaseDate,
  average,
  overview,
  cardStyle,
}: CardInfoProps) => {
  const navigate = useNavigate();

  return (
    <Info style={cardStyle}>
      <header>
        <MovieTitle>
          {title}{" "}
          <span
            className="movie-series-info-release-date"
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
          className="avg-progressbar"
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
        <Button
          tooltiptitle="Cast and Crew"
          onClick={() => {
            navigate("cast/all", { unstable_viewTransition: true });
          }}
        />
      </CoverButtonsContainer>
      <Overview>{overview}</Overview>
    </Info>
  );
};

export default MovieSerieCardInfo;
