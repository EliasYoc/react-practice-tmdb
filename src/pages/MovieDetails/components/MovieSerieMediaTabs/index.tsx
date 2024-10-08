import { useContext, useState } from "react";
import TabsCustom from "../../../../components/TabsCustom";
import { useParams } from "react-router-dom";
import CustomSwiper from "../../../../components/CustomSwiper";
import { ConfigContext } from "../../../../context/ConfigurationContext";
import "./styles.css";
import { SwiperCard } from "./styles";
import { TheShowImage, TMDBTheShowsImages } from "../../../../types";
import { makeViewTransition, mediaQueries } from "../../../../utils/helper";
import { flushSync } from "react-dom";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import ImageGrid from "../../../../components/ImageGrid";
import CustomModal from "../../../../components/CustomModal";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import useShowsDetails from "../../../../hooks/react-query/useShowsDetails";

// const initialBatchOfImages = {
//   logos: { count: 0, data: [] },
//   posters: { count: 0, data: [] },
//   backdrops: { count: 0, data: [] },
// };

interface IImagesByType {
  logos: IImageResult;
  posters: IImageResult;
  backdrops: IImageResult;
}
interface IImageResult {
  count: number;
  data: TheShowImage[];
}

interface IImgListCollapsed {
  [key: string]: boolean;
}
const MovieSerieMediaTabs = () => {
  //TODO: USE REACT QUERY
  //TODO: USE VIRTUALIZER
  //TODO: APPLY 130CH HEIGHT
  const { id, mediaType } = useParams();
  const matchSmScreen = useMediaQuery(mediaQueries.sm);

  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const images = tmdbConfigurationDetails?.images;
  const [isImgListCollapsed, setIsImgListCollapsed] =
    useState<IImgListCollapsed>({
      logos: false,
      posters: false,
      backdrops: false,
    });
  const [itemForModal, setItemForModal] = useState<TheShowImage | null>(null);
  const { data, isPending, isError, error } =
    useShowsDetails<TMDBTheShowsImages>({
      id,
      mediaType,
      pathRest: "/images",
    });
  if (isPending) return <div>Loading...</div>;
  if (isError) {
    return <div>{error.message}</div>;
  }

  const imagesByType: IImagesByType = {
    logos: { count: data.logos.length, data: data.logos },
    posters: {
      count: data.posters.length,
      data: data.posters,
    },
    backdrops: {
      count: data.backdrops.length,
      data: data.backdrops,
    },
  };
  const handleOpenModal = (item: TheShowImage) => {
    setItemForModal(item);
  };
  const handleCloseModal = () => {
    setItemForModal(null);
  };

  const cardsToTransitionCount = 5;

  const posterSliders = [
    ...imagesByType.posters.data
      .slice(0, cardsToTransitionCount)
      .map((item) => (
        <img
          onClick={() => handleOpenModal(item)}
          className="withViewTransition"
          data-view-transition-name={getDynamicViewTransitionNameForImages(
            item,
            "poster"
          )}
          style={{
            width: "100%",
            aspectRatio: "2/3",
            borderRadius: "1rem",
            userSelect: "none",
            viewTransitionName: getDynamicViewTransitionNameForImages(
              item,
              "poster"
            ),
          }}
          src={`${images?.base_url}${images?.profile_sizes[2]}${item.file_path}`}
        />
      ))
      .reverse(),
    imagesByType.posters.count >
    imagesByType.posters.data.slice(0, cardsToTransitionCount).length ? (
      <SwiperCard style={{ aspectRatio: "2/3" }}>
        see more button(not ready)...
      </SwiperCard>
    ) : null,
  ];

  const logosSliders = [
    ...imagesByType.logos.data
      .slice(0, cardsToTransitionCount)
      .map((item, i) => (
        <img
          onClick={() => handleOpenModal(item)}
          data-view-transition-name={getDynamicViewTransitionNameForImages(
            item,
            "logo"
          )}
          style={{
            width: "150px",
            viewTransitionName:
              i < 1
                ? getDynamicViewTransitionNameForImages(item, "logo")
                : undefined,
          }}
          src={`${images?.base_url}${images?.logo_sizes[2]}${item.file_path}`}
        />
      )),
    imagesByType.logos.count >
    imagesByType.logos.data.slice(0, cardsToTransitionCount).length ? (
      <p>see more</p>
    ) : null,
  ];

  const backdropsSliders = [
    ...imagesByType.backdrops.data
      .slice(0, cardsToTransitionCount)
      .map((item, i) => (
        <img
          onClick={() => handleOpenModal(item)}
          data-view-transition-name={getDynamicViewTransitionNameForImages(
            item,
            "backdrop"
          )}
          style={{
            width: "100%",
            aspectRatio: "16/9",
            viewTransitionName:
              i < 1
                ? getDynamicViewTransitionNameForImages(item, "backdrop")
                : undefined,
          }}
          src={`${images?.base_url}${images?.backdrop_sizes[2]}${item.file_path}`}
        />
      )),
    imagesByType.backdrops.count >
    imagesByType.backdrops.data.slice(0, cardsToTransitionCount).length ? (
      <p>see more</p>
    ) : null,
  ];

  const collapseImageList = (label: string) => {
    makeViewTransition(() => {
      flushSync(() =>
        setIsImgListCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))
      );
    });
  };

  function getDynamicViewTransitionNameForImages(
    item: TheShowImage,
    type: string
  ) {
    return `${type}${item.file_path.split("/")[1].split(".")[0]}`;
  }

  const getMenuOptions = (imapeType: string) => [
    {
      onClick: () => collapseImageList(imapeType),
      optionLabel: isImgListCollapsed[imapeType] ? "Hide Cards" : "Show Cards",
      optionIcon: isImgListCollapsed[imapeType] ? (
        <FiMinimize2 />
      ) : (
        <FiMaximize2 />
      ),
    },
  ];

  const postersTab = isImgListCollapsed["posters"] ? (
    <ImageGrid
      imageData={imagesByType.posters.data}
      typeOfImage="poster"
      cardsToTransitionCount={cardsToTransitionCount}
      onClickImage={handleOpenModal}
    />
  ) : (
    <CustomSwiper
      effect="cards"
      pagination={{ clickable: true }}
      sliders={posterSliders}
      style={{ width: "300px", overflow: "visible" }}
    />
  );

  const logosTab = isImgListCollapsed["logos"] ? (
    <ImageGrid
      imageData={imagesByType.logos.data}
      typeOfImage="logo"
      cardsToTransitionCount={1}
      aspectRatio="16/9"
      onClickImage={handleOpenModal}
    />
  ) : (
    <CustomSwiper
      pagination={{ clickable: true }}
      swiperSlideStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
      cssMode
      sliders={logosSliders}
    />
  );

  const backdropsTab = isImgListCollapsed["backdrops"] ? (
    <ImageGrid
      imageData={imagesByType.backdrops.data}
      typeOfImage="backdrop"
      cardsToTransitionCount={1}
      aspectRatio="16/9"
      gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
      onClickImage={handleOpenModal}
    />
  ) : (
    <CustomSwiper
      pagination={{ clickable: true }}
      cssMode
      sliders={backdropsSliders}
    />
  );

  const modalOpen = Boolean(itemForModal);
  return (
    <>
      <TabsCustom
        tabPanelStyle={{
          overflow: "hidden",
          padding: "1rem 0",
          maxWidth: "120ch",
          margin: "0 auto",
        }}
        tabList={[
          {
            label: "Posters",
            tabPanel: postersTab,
            menuOptions: getMenuOptions("posters"),
            onDoubleClick: () => {
              collapseImageList("posters");
            },
          },
          imagesByType.logos.count > 0
            ? {
                label: "Logos",
                tabPanel: logosTab,

                onDoubleClick: () => {
                  collapseImageList("logos");
                },
                menuOptions: getMenuOptions("logos"),
              }
            : null,
          {
            label: "Backdrops",
            tabPanel: backdropsTab,
            onDoubleClick: () => {
              collapseImageList("backdrops");
            },
            menuOptions: getMenuOptions("backdrops"),
          },
        ]}
      />
      {/* revisar si este custom modal lo puedo pasar dentro de ImageGrid */}
      <CustomModal
        fullWidth={false}
        open={modalOpen}
        onClose={handleCloseModal}
        containerSx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          visibility: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "var(--box-bg-color)",
            visibility: "visible",
          }}
        >
          <img
            style={{
              width: matchSmScreen ? "100%" : "auto",
              maxHeight: "100vh",
              aspectRatio: itemForModal?.aspect_ratio,
              objectFit: matchSmScreen ? "contain" : "fill",
              visibility: "visible",
              filter: "drop-shadow(0 0 0.15rem black)",
            }}
            src={`${images?.base_url}${images?.backdrop_sizes[1]}${itemForModal?.file_path}`}
          />
        </div>
      </CustomModal>
    </>
  );
};

export default MovieSerieMediaTabs;
