import { useNavigate, useParams } from "react-router-dom";
import TabsCustom from "../../components/TabsCustom";
import CastTabPanel from "./components/CastTabPanel";
import { ITmdbPerson } from "../../types";
import useShowsDetails from "../../hooks/react-query/useShowsDetails";

interface IPathTvMovie {
  [key: string]: string;
  // movie: string;
  // tv: string;
}
interface ITeam {
  cast: ITmdbPerson[];
  crew: ITmdbPerson[];
}
const Cast = () => {
  const pathForTvOrMovie: IPathTvMovie = {
    movie: "/credits",
    tv: "/aggregate_credits",
  };

  const navigate = useNavigate();

  const { id, mediaType = "movie" } = useParams();
  const {
    data: team,
    isPending,
    isError,
    error,
  } = useShowsDetails<ITeam>({
    id,
    mediaType,
    pathRest: pathForTvOrMovie[mediaType],
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) {
    return <div>{error.message}</div>;
  }

  const tabsHandleChange = () => {
    navigate("../all", { relative: "path", replace: true });
  };

  return (
    <>
      <TabsCustom
        onChange={tabsHandleChange}
        tabList={[
          { label: "Cast", tabPanel: <CastTabPanel data={team.cast} /> },
          { label: "Crew", tabPanel: <CastTabPanel data={team.crew} /> },
        ]}
      />
    </>
  );
};

export default Cast;
