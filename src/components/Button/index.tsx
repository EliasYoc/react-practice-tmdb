import { FaPeopleGroup } from "react-icons/fa6"
import { IconButtonStyled } from "./styles"
import { Tooltip } from "@mui/material"
const Button = ({ ...props }) => {

  return (
    <Tooltip title={props.tooltiptitle}>
      <IconButtonStyled {...props}>
        <FaPeopleGroup />
      </IconButtonStyled>
    </Tooltip>
  )
}

export default Button