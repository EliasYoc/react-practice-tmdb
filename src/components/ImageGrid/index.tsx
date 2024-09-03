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

/**
 * Generate an Image Grid component based on the provided imageData and configuration from(tmdbConfiguration).
 *
 * @param {string} [aspectRatio="2/3"] - The aspect ratio of the images
 * @param {number} cardsToTransitionCount - The number of cards to transition
 * @param {TheShowImage[]} imageData - Array of image data
 * @param {string} typeOfImage - The type of images
 * @param {string} [gridTemplateColumns] - The grid template columns for the grid
 * @param {(item: TheShowImage) => void} [onClickImage] - Function to handle click on an image, it provides the item
 * @return {JSX.Element} The Image Grid component
 */
const ImageGrid = ({
  aspectRatio = "2/3",
  cardsToTransitionCount,
  imageData,
  typeOfImage,
  gridTemplateColumns,
  onClickImage,
}: {
  aspectRatio?: string;
  cardsToTransitionCount: number;
  imageData: TheShowImage[];
  typeOfImage: string;
  gridTemplateColumns?: string;
  onClickImage?: (item: TheShowImage) => void;
}) => {
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const imagesConfig = tmdbConfigurationDetails?.images;
  const matchSmScreen = useMediaQuery(mediaQueries.sm);

  return (
    <CustomGrid gridTemplateColumns={gridTemplateColumns}>
      {imageData.map((item, i) => (
        <img
          onClick={() => {
            if (onClickImage) onClickImage(item);
          }}
          alt={item.file_path}
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
            objectFit: "cover",
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
