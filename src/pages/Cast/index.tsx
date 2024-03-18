import { useLoaderData, useNavigate } from "react-router-dom";
import TabsCustom from "../../components/TabsCustom";
import CastTabPanel from "./components/CastTabPanel";
import { ITmdbPerson } from "../../types";
import { useMemo } from "react";

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
  const memoTeam = useMemo(() => {
    return team
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log("tabs")
  return (
    <>
      <TabsCustom
        onChange={tabsHandleChange}
        tabList={[
          { label: "Cast", tabPanel: <CastTabPanel data={memoTeam.cast} /> },
          { label: "Crew", tabPanel: <CastTabPanel data={memoTeam.crew} /> },
        ]}
      />
    </>
  );
};

export default Cast;
