import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
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
import { LuChevronDown } from "react-icons/lu"
import { Link, useNavigate } from "react-router-dom";

const MovieCard = ({ src, average, title, id, releaseDate, description }) => {
  const navigate = useNavigate()
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const getAverageColor = (average) => {
    if (average <= 2) return "#fb4b4b";
    if (average <= 4) return "#ff8746";
    if (average <= 6) return "#f2e176";
    if (average <= 8) return "#90f366";
    if (average <= 10) return "#0ece2e";
    return "#3e98c7";
  };

  const formattedDate = Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(releaseDate));
  return (
    <Card onClick={() =>
      navigate(`/movie/${id}`)} className={isOverviewOpen ? "open-overview" : ""}>

      <CardImg draggable="false" loading="lazy" src={src} alt={title} />

      <CardBody>
        <ContainerVisibleContent
          onClick={(e) => {
            e.stopPropagation();
            setIsOverviewOpen(!isOverviewOpen)
          }}
          className={isOverviewOpen ? "open-overview" : ""}
        >
          <CircularProgressbarWrapper className={isOverviewOpen ? "open-overview" : ""}>
            <CircularProgressbarWithChildren
              strokeWidth={15}
              value={average}
              minValue={0}
              maxValue={10}
              text={average.toString()}
              styles={buildStyles({
                pathColor: getAverageColor(average),
                textColor: getAverageColor(average),
                trailColor: "#d6d6d654",
                textSize: "2rem",
              })}
            />
          </CircularProgressbarWrapper>
          <CardDate dateTime={releaseDate}>{formattedDate}</CardDate>
          <ArrowWrapper className={isOverviewOpen ? "open-overview" : ""}>
            <LuChevronDown style={{ color: getAverageColor(average), fontSize: "1.5rem" }} />
          </ArrowWrapper>
        </ContainerVisibleContent>
        <CardDescription onClick={(e) => {
          e.stopPropagation();
          setIsOverviewOpen(false)
        }} className={isOverviewOpen ? "open-overview" : ""}>
          <CardTitle className={isOverviewOpen ? "open-overview" : ""}>{title}</CardTitle>
          <p>{description}</p>
        </CardDescription>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
