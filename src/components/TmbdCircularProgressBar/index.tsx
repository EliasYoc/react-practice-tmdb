import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import { getAverageColor } from "../../utils/helper"

interface CircularProgress {
  value: number
  minValue?: number
  maxValue?: number
  strokeWidth?: number
  text?: string
  textSize?: string
}

const TmdbCircularPtogressBar = ({ value, minValue = 0, maxValue = 100, strokeWidth = 15, text = "", textSize = "2rem" }: CircularProgress) => {

  return (
    <CircularProgressbarWithChildren
      strokeWidth={strokeWidth}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      text={text}
      styles={buildStyles({
        pathColor: getAverageColor(value),
        textColor: getAverageColor(value),
        trailColor: "#d6d6d654",
        textSize,
      })}
    />
  )
}

export default TmdbCircularPtogressBar