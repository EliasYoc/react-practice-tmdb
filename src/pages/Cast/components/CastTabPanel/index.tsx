import { useCallback, useContext, useMemo } from "react";
import * as R from "ramda"
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
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const images = tmdbConfigurationDetails?.images;
  const navigate = useNavigate();
  const { department: departmentParam } = useParams();
  console.log(data)
  const getTeamByDepartment = ({ known_for_department }: ITmdbPerson) =>
    known_for_department.toLowerCase().split(" ").join("_");

  const groupByDepartment = R.groupBy(getTeamByDepartment);
  const teamDepartmentsOfThisCast = useMemo(() => {
    console.log("memo")
    return groupByDepartment(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const noDuplicatedData = useCallback(
    (acc: ITmdbPerson[], curr: ITmdbPerson) => {
      const isPersonDuplicated = acc.some((item) => item.id === curr.id);
      if (!isPersonDuplicated) acc.push(curr);
      return acc;
    },
    []
  );

  const dataNoDuplicated: ITmdbPerson[] = useMemo(() => {
    if (departmentParam === "all") return data.reduce(noDuplicatedData, []);
    if (!teamDepartmentsOfThisCast[departmentParam]) return [];
    return teamDepartmentsOfThisCast[departmentParam].reduce(
      noDuplicatedData,
      []
    );
  }, [departmentParam, teamDepartmentsOfThisCast, data, noDuplicatedData]);

  const castDepartments = useMemo(() => {
    return [
      ...new Set(
        data.map((person: ITmdbPerson) => person.known_for_department)
      ),
      "all",
    ].map((departmentName) => ({
      name: departmentName,
      key: departmentName.toLowerCase().split(" ").join("_"),
    }));
  }, [data]);

  return (
    <CastTabContainer>
      <Departments>
        {castDepartments.map((department) => (
          <DeparmentName
            className={department.key === departmentParam ? "active" : ""}
            key={department.key}
            onClick={() => {
              const departmentSelected = department.key;
              const $oldDepartment = document.querySelectorAll<HTMLDivElement>(".person-card");
              const newSelectedDepartment: ITmdbPerson[] =
                departmentSelected === "all"
                  ? data.reduce(noDuplicatedData, [])
                  : teamDepartmentsOfThisCast[departmentSelected];

              $oldDepartment.forEach((person) => {
                const personId = person.dataset.id;
                if (personId) {
                  const newAndOldMatches = newSelectedDepartment?.some(
                    (item) => item.id === parseInt(personId)
                  );
                  if (newAndOldMatches)
                    person.setAttribute("style", `view-transition-name: person-${person.dataset.id}`);
                }

              });
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
            className="person-card"
            key={castPerson.id}
            id={castPerson.id}
            src={
              castPerson.profile_path &&
              `${images?.base_url}${images?.profile_sizes[0]}${castPerson.profile_path}`
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
