import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { VariableSizeList } from "react-window";
import { throttle } from "lodash";

interface ITabPanelProps {
  data: ITmdbPerson[];
}
const CastTabPanel = ({ data }: ITabPanelProps) => {
  const listRef = useRef<VariableSizeList | null>(null);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
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

  useEffect(
    () => {
      const getInitiaalItemSizes = () => {
        // la primera vez se renderizan todos los elementos en VariableSizeList antes de virtualizar

        const heights = Array.from({ length: dataChunks.length }, (_, i) => {
          const $castGrid = document.getElementById(`cast-grid-${i}`) as Element;

          let computedStyle = null;
          if ($castGrid) {
            computedStyle = getComputedStyle($castGrid);
          }

          return computedStyle ? parseInt(computedStyle.height) : 0;
        });

        setItemHeights(heights);
        if (listRef.current) listRef.current.resetAfterIndex(0);
      }
      const recalculateItemSizes = throttle(() => {
        const elements = Array.from(document.querySelectorAll<HTMLDivElement>(".cast-grid"));

        const $firstElementWithAvailableHeight = elements.find(($el) => {
          const computedStyle = getComputedStyle($el);
          return computedStyle?.height
        })

        const firstElementHeight = $firstElementWithAvailableHeight ? parseInt((getComputedStyle($firstElementWithAvailableHeight)?.height)) : 0;

        setItemHeights(prev => {
          return prev.map((itemHeight, i) => {
            if (i + 1 < prev.length) return firstElementHeight;
            return itemHeight
          })
        })

        if (listRef.current) listRef.current.resetAfterIndex(0);
      }, 150);

      window.addEventListener("resize", recalculateItemSizes);
      getInitiaalItemSizes();
      return () => {
        window.removeEventListener("resize", recalculateItemSizes);
      };
    },
    [dataChunks.length]
  );

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

  const spacing = 16;

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
      <VariableSizeList
        ref={listRef}
        width="100%"
        itemData={dataChunks}
        height={500}
        itemCount={dataChunks.length}
        itemSize={(index) => {
          if (!itemHeights[index]) return 0;
          return itemHeights[index] + spacing;
        }}
      >
        {({ data: dataChunks, index, style }) => {
          const dataChunk: ITmdbPerson[] = dataChunks[index];

          return (
            <div style={{ ...style, }}>
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
      </VariableSizeList>
    </CastTabContainer >
  );
};

export default CastTabPanel;
