import { useLoaderData, useNavigate } from "react-router-dom";
import TabsCustom from "../../components/TabsCustom";
import CastTabPanel from "./components/CastTabPanel";
import { ITmdbPerson } from "../../types";

interface ITeam {
  cast: ITmdbPerson[];
  crew: ITmdbPerson[];
}
const Cast = () => {
  const navigate = useNavigate()
  const { team } = useLoaderData() as { team: ITeam };

  const tabsHandleChange = () => {
    navigate("../all", { relative: "path", replace: true })
  }
  return (
    <div>
      <TabsCustom
        onChange={tabsHandleChange}
        tabList={[
          { label: "Cast", tabPanel: <CastTabPanel data={team.cast} /> },
          { label: "Crew", tabPanel: <CastTabPanel data={team.crew} /> },
        ]}
      />
    </div>
  );
};

export default Cast;
