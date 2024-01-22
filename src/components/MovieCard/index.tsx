import "react-circular-progressbar/dist/styles.css";
import {
  ArrowWrapper,
  Card,
  CardBody,
  CardDate,
  CardDescription,
  CardImg,
  CardTitle,
  ContainerVisibleContent,
  CircularProgressbarWrapper,
} from "./styles";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { unstable_useViewTransitionState, useNavigate } from "react-router-dom";
import { formatDate, getAverageColor } from "../../utils/helper";
import TmdbCircularPtogressBar from "../TmbdCircularProgressBar";

interface MovieCardProps {
  src: string;
  backdropSrc: string;
  average: number;
  title?: string;
  id: number;
  releaseDate?: string;
  description: string;
  mediaType: "movie" | "tv";
}

const MovieCard = ({ src, backdropSrc, average, title, id, releaseDate = "00-00-0000", description, mediaType }: MovieCardProps) => {
  const navigate = useNavigate();
  const to = `/${mediaType}/${id}`;
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const isTransitioning = unstable_useViewTransitionState(to);

  const formattedDate = formatDate(
    navigator.language,
    { year: "numeric", month: "short", day: "numeric" },
    new Date(releaseDate)
  );

  return (
    <Card
      onClick={() => {
        navigate(to, {
          unstable_viewTransition: true,
          state: {
            title,
            releaseDate: formattedDate,
            serieMovieAverage: average,
            posterSrc: src,
            backdropSrc: backdropSrc,
          },
          preventScrollReset: true,
        });
      }}
      className={isOverviewOpen ? "open-overview" : ""}
    >
      <CardImg
        draggable="false"
        loading="lazy"
        src={src}
        alt={title}
        style={{
          viewTransitionName: isTransitioning ? "poster" : "",
          contain: "layout",
        }}
      />

      <CardBody>
        <ContainerVisibleContent
          onClick={(e) => {
            e.stopPropagation();
            setIsOverviewOpen(!isOverviewOpen);
          }}
          className={isOverviewOpen ? "open-overview" : ""}
        >
          <CircularProgressbarWrapper
            className={isOverviewOpen ? "open-overview" : ""}
            style={{
              viewTransitionName: isTransitioning ? "show-avg-progress" : "",
              contain: "layout",
            }}
          >
            <TmdbCircularPtogressBar
              value={average}
              maxValue={10}
              text={average.toString()}
            />
          </CircularProgressbarWrapper>
          <CardDate
            dateTime={releaseDate}
            style={{
              viewTransitionName: isTransitioning
                ? "movie-series-release-date"
                : "",
              contain: "layout",
            }}
          >
            {formattedDate}
          </CardDate>
          <ArrowWrapper className={isOverviewOpen ? "open-overview" : ""}>
            <LuChevronDown
              style={{ color: getAverageColor(average), fontSize: "1.5rem" }}
            />
          </ArrowWrapper>
        </ContainerVisibleContent>
        <CardDescription
          onClick={(e) => {
            e.stopPropagation();
            setIsOverviewOpen(false);
          }}
          className={isOverviewOpen ? "open-overview" : ""}
        >
          <CardTitle className={isOverviewOpen ? "open-overview" : ""}>
            {title}
          </CardTitle>
          <p>{description}</p>
        </CardDescription>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
