import { useContext, useMemo } from "react";
import { ConfigContext } from "../../../../context/ConfigurationContext";
import PersonCard from "../../../../components/PersonCard";
import {
  CastGrid,
  CastTabContainer,
  DeparmentName,
  Departments,
} from "./styles";
import { ITmdbPerson } from "../../../../types";
import { useNavigate, useParams } from "react-router-dom";

interface ITabPanelProps {
  data: ITmdbPerson[];
}
const CastTabPanel = ({ data }: ITabPanelProps) => {
  const {
    tmdbConfigurationDetails: { images },
  } = useContext(ConfigContext);
  const navigate = useNavigate();
  const { department: departmentParam } = useParams();
  const getTeamByDepartment = ({ known_for_department }: ITmdbPerson) =>
    known_for_department.toLowerCase().split(" ").join("_");
  const teamDepartmentsOfThisCast = Object.groupBy(data, getTeamByDepartment);

  const dataNoDuplicated = useMemo(() => {
    const noDuplicatedData = (acc: ITmdbPerson[], curr) => {
      const isPersonDuplicated = acc.some((item) => item.id === curr.id);
      if (!isPersonDuplicated) acc.push(curr);
      return acc;
    };

    if (departmentParam === "all") return data.reduce(noDuplicatedData, []);

    return teamDepartmentsOfThisCast[departmentParam].reduce(
      noDuplicatedData,
      []
    );
  }, [data, departmentParam, teamDepartmentsOfThisCast]);

  const castDepartments = useMemo(
    () =>
      [
        ...new Set(
          data.map((person: ITmdbPerson) => person.known_for_department)
        ),
        "all",
      ].map((departmentName) => ({
        name: departmentName,
        key: departmentName.toLowerCase().split(" ").join("_"),
      })),
    [data]
  );

  console.log(castDepartments);

  return (
    <CastTabContainer>
      <Departments>
        {castDepartments.map((department) => (
          <DeparmentName
            className={department.key === departmentParam ? "active" : ""}
            style={{ viewTransitionName: `department-${department.key}` }}
            key={department.key}
            onClick={() => {
              navigate(`../${department.key}`, {
                relative: "path",
                replace: true,
                unstable_viewTransition: true,
              });
            }}
          >
            {department.name}
          </DeparmentName>
        ))}
      </Departments>
      <CastGrid>
        {dataNoDuplicated.map((castPerson) => (
          <PersonCard
            key={castPerson.id}
            id={castPerson.id}
            src={
              castPerson.profile_path &&
              `${images.base_url}${images.profile_sizes[0]}${castPerson.profile_path}`
            }
            realName={castPerson.name}
            characterName={castPerson.character}
            department={castPerson.known_for_department}
          />
        ))}
      </CastGrid>
    </CastTabContainer>
  );
};

export default CastTabPanel;
