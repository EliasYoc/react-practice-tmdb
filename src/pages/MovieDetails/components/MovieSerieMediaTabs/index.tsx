import { useContext, useEffect, useState } from "react";
import TabsCustom from "../../../../components/TabsCustom";
import { getShowById } from "../../../../services/tmdb/tmdbMovies";
import { useParams } from "react-router-dom";
import CustomSwiper from "../../../../components/CustomSwiper";
import { ConfigContext } from "../../../../context/ConfigurationContext";
import "./styles.css";
import { SwiperCard } from "./styles";
import { TheShowImage } from "../../../../types";
import { CustomGrid } from "../../../../globalStyledComponents";
import { makeViewTransition } from "../../../../utils/helper";
import { flushSync } from "react-dom";

const initialBatchOfImages = {
  logos: { count: 0, data: [] },
  posters: { count: 0, data: [] },
  backdrops: { count: 0, data: [] },
};
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
  const { id, mediaType } = useParams();
  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const images = tmdbConfigurationDetails?.images;
  const [imagesByType, setImagesByType] =
    useState<IImagesByType>(initialBatchOfImages);
  const [isImgListCollapsed, setIsImgListCollapsed] =
    useState<IImgListCollapsed>({
      logos: false,
      posters: false,
      backdrops: false,
    });
  const cardsToTransitionCount = 5;

  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await getShowById({
          id,
          mediaType,
          pathRest: "/images",
        });

        setImagesByType({
          logos: { count: data.logos.length, data: data.logos },
          posters: {
            count: data.posters.length,
            data: data.posters,
          },
          backdrops: {
            count: data.backdrops.length,
            data: data.backdrops,
          },
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMedia();
  }, [id, mediaType]);

  const posterSliders = [
    ...imagesByType.posters.data
      .slice(0, cardsToTransitionCount)
      .map((item) => (
        <img
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
      .map((item) => (
        <img
          style={{ width: "150px" }}
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
      .map((item) => (
        <img
          style={{ width: "100%", aspectRatio: "16/9" }}
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

  return (
    <TabsCustom
      tabPanelStyle={{ overflow: "hidden", padding: "1rem 0" }}
      tabList={[
        {
          label: "Posters",
          tabPanel: isImgListCollapsed["posters"] ? (
            <CustomGrid>
              {imagesByType.posters.data.map((item, i) => (
                <img
                  className={
                    i < cardsToTransitionCount
                      ? "withViewTransition"
                      : undefined
                  }
                  data-view-transition-name={
                    i < cardsToTransitionCount
                      ? getDynamicViewTransitionNameForImages(item, "poster")
                      : undefined
                  }
                  key={item.file_path}
                  style={{
                    width: "100%",
                    aspectRatio: "2/3",
                    borderRadius: "1rem",
                    userSelect: "none",
                    viewTransitionName:
                      i < cardsToTransitionCount
                        ? getDynamicViewTransitionNameForImages(item, "poster")
                        : undefined,
                  }}
                  src={`${images?.base_url}${images?.profile_sizes[2]}${item.file_path}`}
                />
              ))}
            </CustomGrid>
          ) : (
            <CustomSwiper
              effect="cards"
              pagination={{ clickable: true }}
              sliders={posterSliders}
              style={{ width: "300px", overflow: "visible" }}
            />
          ),
          onDoubleClick: () => {
            collapseImageList("posters");
          },
        },
        imagesByType.logos.count > 0
          ? {
              label: "Logos",
              tabPanel: (
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
              ),
              onDoubleClick: () => {
                collapseImageList("logos");
              },
            }
          : null,
        {
          label: "Backdrops",
          tabPanel: (
            <CustomSwiper
              pagination={{ clickable: true }}
              cssMode
              sliders={backdropsSliders}
            />
          ),
          onDoubleClick: () => {
            collapseImageList("backdrops");
          },
        },
      ]}
    />
  );
};

export default MovieSerieMediaTabs;
