import { useContext } from "react";
import { CustomGrid } from "../../globalStyledComponents";
import { TheShowImage } from "../../types";
import { ConfigContext } from "../../context/ConfigurationContext";
import { mediaQueries } from "../../utils/helper";
import { useMediaQuery } from "@mui/material";

function getDynamicViewTransitionNameForImages(
  item: TheShowImage,
  type: string
) {
  return `${type}${item.file_path.split("/")[1].split(".")[0]}`;
}

const ImageGrid = ({
  aspectRatio = "2/3",
  cardsToTransitionCount,
  imageData,
  typeOfImage,
  gridTemplateColumns,
}: {
  aspectRatio?: string;
  cardsToTransitionCount: number;
  imageData: TheShowImage[];
  typeOfImage: string;
  gridTemplateColumns?: string;
}) => {
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const imagesConfig = tmdbConfigurationDetails?.images;
  const matchSmScreen = useMediaQuery(mediaQueries.sm);

  return (
    <CustomGrid gridTemplateColumns={gridTemplateColumns}>
      {imageData.map((item, i) => (
        <img
          className={
            i < cardsToTransitionCount ? "withViewTransition" : undefined
          }
          data-view-transition-name={
            i < cardsToTransitionCount
              ? getDynamicViewTransitionNameForImages(item, typeOfImage)
              : undefined
          }
          key={item.file_path}
          style={{
            width: "100%",
            aspectRatio,
            borderRadius: "1rem",
            userSelect: "none",
            viewTransitionName:
              i < cardsToTransitionCount
                ? getDynamicViewTransitionNameForImages(item, typeOfImage)
                : undefined,
          }}
          src={`${imagesConfig?.base_url}${
            imagesConfig?.profile_sizes[matchSmScreen ? 1 : 2]
          }${item.file_path}`}
        />
      ))}
    </CustomGrid>
  );
};

export default ImageGrid;
