import { useLocation } from "react-router-dom";

import {
  Cover,
  CoverDetails,
  CoverImg,
  ImgBackdrop,
  Poster,
  PosterWrapper,
} from "./styles";
import { CSSProperties } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { mediaQueries } from "../../utils/helper";
import MovieSerieCardInfo from "./components/MovieSerieCardInfo";

type CustomStyle = CSSProperties & {
  "--viewTransitionName"?: string;
};

const PageCover = ({
  srcPoster,
  srcBackdrop,
  title,
  average,
  releaseDate,
  overview,
}) => {
  const matchMdScreen = useMediaQuery(mediaQueries.md);

  const posterInlineStyle: CustomStyle = {
    "--viewTransitionName": "poster",
    contain: "layout",
  };
  // I use the state from /MovieCard component to load the average and date faster in order to have a better view transition, because I need the movie date and release date etc to be placed (from /MovieCard to /PageCover) in the element that is transitioning )

  return (
    <>
      <Cover>
        <CoverImg src={srcBackdrop} alt={title} />
        <ImgBackdrop />
        <CoverDetails>
          <PosterWrapper>
            <Poster
              src={srcPoster}
              alt={title}
              style={posterInlineStyle}
            />
          </PosterWrapper>
          {!matchMdScreen && (
            <MovieSerieCardInfo
              title={title}
              releaseDate={releaseDate}
              average={average}
              overview={overview}
            />
          )}
        </CoverDetails>
      </Cover>

    </>
  );
};

export default PageCover;
