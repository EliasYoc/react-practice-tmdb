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
  "--posterViewTransitionName"?: string;
};

interface PageCoverProps {
  srcPoster: string;
  srcBackdrop: string;
  title?: string;
  average?: number;
  releaseDate?: string;
  overview?: string;
}

const PageCover = ({
  srcPoster,
  srcBackdrop,
  title,
  average = 0,
  releaseDate,
  overview,
}: PageCoverProps) => {
  const matchMdScreen = useMediaQuery(mediaQueries.md);

  const posterInlineStyle: CustomStyle = {
    "--posterViewTransitionName": "poster",
    contain: "layout",
    backgroundImage: `url(${srcPoster})`,
    backgroundSize: "cover",
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
              className="detailsOfShowPoster"
              // src={srcPoster}
              // alt={title}
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
