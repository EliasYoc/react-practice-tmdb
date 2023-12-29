import { useLocation } from "react-router-dom";
import TmdbCircularPtogressBar from "../TmbdCircularProgressBar";
import {
  CircularProgressbarWrapper,
  Cover,
  CoverButtonsContainer,
  CoverDetails,
  CoverImg,
  CoverInfo,
  ImgBackdrop,
  MovieTitle,
  Overview,
  Poster,
  PosterWrapper,
} from "./styles";
import { CSSProperties } from "react";

type CustomStyle = CSSProperties & {
  "--viewTransitionName"?: string;
};

const PageCover = ({
  srcPoster,
  srcBackdrop,
  title,
  average,
  id,
  releaseDate,
  overview,
}) => {
  const posterInlineStyle: CustomStyle = {
    "--viewTransitionName": "poster",
    contain: "layout",
  };
  // I use the state from /MovieCard component to load the average and date faster in order to have a better view transition, because I need the movie date and release date etc to be placed (from /MovieCard to /PageCover) in the element that is transitioning )
  const { state } = useLocation();

  return (
    <Cover>
      <CoverImg src={srcBackdrop || state?.backdropSrc} alt={title} />
      <ImgBackdrop />
      <CoverDetails>
        <PosterWrapper>
          <Poster src={srcPoster || state?.posterSrc} alt={title} style={posterInlineStyle} />
        </PosterWrapper>
        <CoverInfo>
          <header>
            <MovieTitle>
              {state?.title || title}
              <span
                style={{
                  // inline-block because the other related element is block
                  display: "inline-block",
                  viewTransitionName: "movie-series-release-date",
                }}
              >
                ( {releaseDate || state?.releaseDate})
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
                value={average || state?.serieMovieAverage}
                maxValue={10}
                textSize="1.3rem"
                text={(average * 10)?.toFixed(2)?.toString() + "%"}
              />
            </CircularProgressbarWrapper>
          </CoverButtonsContainer>
          <Overview>{overview}</Overview>
        </CoverInfo>
      </CoverDetails>
    </Cover>
  );
};

export default PageCover;
