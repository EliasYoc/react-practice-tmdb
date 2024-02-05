import { FaPersonCircleQuestion } from "react-icons/fa6";
import {
  Person,
  PersonImage,
  PersonImgWrapper,
  PersonInfo,
  PersonName,
  PersonCharacterName,
} from "./styles";

interface IPersonCardProps {
  src: string | null;
  realName: string;
  characterName?: string;
  department: string;
  id: number;
  className?: string;
}
const PersonCard = ({
  src,
  realName,
  characterName,
  department,
  id,
  className,
}: IPersonCardProps) => {
  return (
    <Person className={className} data-id={id}>
      <PersonImgWrapper>
        {src ? (
          <PersonImage
            className="blurry"
            loading="lazy"
            src={src}
            alt={realName}
            onLoad={(e) => {
              if (e.target instanceof HTMLImageElement)
                e.target.classList.remove("blurry");
            }}
          />
        ) : (
          <FaPersonCircleQuestion style={{ fontSize: "2rem" }} />
        )}
      </PersonImgWrapper>
      <PersonInfo id={`person-info-${id}`}>
        <PersonName title={realName}>{realName}</PersonName>
        <PersonCharacterName title={characterName}>
          {characterName}
        </PersonCharacterName>
        <p style={{ fontSize: "0.8rem" }}>{department}</p>
      </PersonInfo>
    </Person>
  );
};

export default PersonCard;
