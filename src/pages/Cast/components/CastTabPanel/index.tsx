import { useContext, useMemo } from "react";
import * as R from "ramda";
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
import { chunkArray } from "../../../../utils/helper";
import ReactVirtualizedAutoSizer from "react-virtualized-auto-sizer";
import CustomVariableSizeList from "../CustomVariableSizeList";

interface ITabPanelProps {
  data: ITmdbPerson[];
}
const CastTabPanel = ({ data }: ITabPanelProps) => {
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const images = tmdbConfigurationDetails?.images;
  const navigate = useNavigate();
  const { department: departmentParam = "all" } = useParams();

  const getTeamByDepartment = ({ known_for_department }: ITmdbPerson) =>
    known_for_department.toLowerCase().split(" ").join("_");

  const groupByDepartment = R.groupBy(getTeamByDepartment);
  const teamDepartmentsOfThisCast = useMemo(() => {
    return groupByDepartment(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dontDuplicateData = (acc: ITmdbPerson[], curr: ITmdbPerson) => {
    const isPersonDuplicated = acc.some((item) => item.id === curr.id);
    if (!isPersonDuplicated) acc.push(curr);
    return acc;
  };

  const dataNoDuplicated: ITmdbPerson[] = useMemo(() => {
    if (departmentParam === "all") return data.reduce(dontDuplicateData, []);
    if (!teamDepartmentsOfThisCast[departmentParam]) return [];
    return teamDepartmentsOfThisCast[departmentParam].reduce(
      dontDuplicateData,
      []
    );
  }, [departmentParam, teamDepartmentsOfThisCast, data]);

  const dataChunks = chunkArray(dataNoDuplicated, 50);

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
              const $oldDepartment =
                document.querySelectorAll<HTMLDivElement>(".person-card");
              const newSelectedDepartment =
                departmentSelected === "all"
                  ? data.reduce(dontDuplicateData, [])
                  : teamDepartmentsOfThisCast[departmentSelected];

              $oldDepartment.forEach((person) => {
                const personId = person.dataset.id;
                if (personId) {
                  const newAndOldMatches = newSelectedDepartment?.some(
                    (item) => item.id === parseInt(personId)
                  );
                  if (newAndOldMatches)
                    person.setAttribute(
                      "style",
                      `view-transition-name: person-${person.dataset.id}`
                    );
                }
              });
              // el codigo anterior ya no es necesario, como ahora se virtualiza con react-window (variableSizeList)
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
      {/* todo: use autosizer component */}
      <div style={{ flex: 1 }}>
        <ReactVirtualizedAutoSizer style={{ width: "100%", flexGrow: 1 }}>
          {({ height }) => (
            <CustomVariableSizeList
              width="100%"
              itemData={dataChunks}
              height={height}
              itemCount={dataChunks.length}
            >
              {({
                data: chunks,
                index,
                style,
              }: {
                data: ITmdbPerson[][];
                index: number;
                style: React.CSSProperties;
              }) => {
                const dataChunk: ITmdbPerson[] = chunks[index];

                return (
                  <div style={{ ...style, paddingTop: "1rem" }}>
                    <CastGrid id={`cast-grid-${index}`} className="cast-grid">
                      {dataChunk.map((castPerson) => (
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
                  </div>
                );
              }}
            </CustomVariableSizeList>
          )}
        </ReactVirtualizedAutoSizer>
      </div>
    </CastTabContainer>
  );
};

export default CastTabPanel;
