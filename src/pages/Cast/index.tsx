import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import TabsCustom from "../../components/TabsCustom";
import CastTabPanel from "./components/CastTabPanel";

const Cast = () => {
  const navigate = useNavigate()
  const { team } = useLoaderData();

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
