import { FaPersonCircleQuestion } from 'react-icons/fa6'
import { Person, PersonImage, PersonImgWrapper, PersonInfo, PersonName, PersonCharacterName } from './styles'

interface IPersonCardProps {
  src: string
  realName: string
  characterName: string
  department: string
  id: number
}
const PersonCard = ({ src, realName, characterName, department, id }: IPersonCardProps) => {
  return (
    <Person style={{ viewTransitionName: id ? `person-${id}` : undefined }} >
      <PersonImgWrapper>
        {src ? <PersonImage src={src} alt={realName} /> : <FaPersonCircleQuestion />}
      </PersonImgWrapper>
      <PersonInfo>
        <PersonName title={realName} >{realName}</PersonName>
        <PersonCharacterName title={characterName}>{characterName}</PersonCharacterName>
        <p style={{ fontSize: "0.8rem" }}>{department}</p>
      </PersonInfo>
    </Person>
  )
}

export default PersonCard