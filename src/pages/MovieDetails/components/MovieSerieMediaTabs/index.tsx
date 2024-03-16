import { useContext, useEffect, useState } from "react";
import TabsCustom from "../../../../components/TabsCustom";
import { getShowById } from "../../../../services/tmdb/tmdbMovies";
import { useParams } from "react-router-dom";
import CustomSwiper from "../../../../components/CustomSwiper";
import { ConfigContext } from "../../../../context/ConfigurationContext";
import "./styles.css";
import { mediaQueries } from "../../../../utils/helper";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { SwiperCard } from "./styles";

const initialBatchOfImages = {
  logos: { count: 0, data: [] },
  posters: { count: 0, data: [] },
  backdrops: { count: 0, data: [] },
};
const MovieSerieMediaTabs = () => {
  const { id, mediaType } = useParams();
  const matchSmScreen = useMediaQuery(mediaQueries.sm);

  const { tmdbConfigurationDetails } = useContext(ConfigContext);
  const images = tmdbConfigurationDetails?.images;
  const [batchOfImages, setBatchOfImages] = useState(initialBatchOfImages);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const { data } = await getShowById({
          id,
          mediaType,
          pathRest: "/images",
        });
        setBatchOfImages({
          logos: { count: data.logos.length, data: data.logos.slice(0, 9) },
          posters: {
            count: data.posters.length,
            data: data.posters.slice(0, 9),
          },
          backdrops: {
            count: data.backdrops.length,
            data: data.backdrops.slice(0, 9),
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
    ...batchOfImages.posters.data.map((item) => (
      <img
        style={{
          width: "100%",
          aspectRatio: "2/3",
          borderRadius: "1rem",
          userSelect: "none",
        }}
        src={`${images?.base_url}${images?.profile_sizes[2]}${item.file_path}`}
      />
    )),
    batchOfImages.posters.count > batchOfImages.posters.data.length ? (
      <SwiperCard style={{ aspectRatio: "2/3" }}>
        see more button(not ready)...
      </SwiperCard>
    ) : null,
  ];

  const logosSliders = [
    ...batchOfImages.logos.data.map((item) => (
      <img
        style={{ width: "150px" }}
        src={`${images?.base_url}${images?.logo_sizes[2]}${item.file_path}`}
      />
    )),
    batchOfImages.logos.count > batchOfImages.logos.data.length ? (
      <p>see more</p>
    ) : null,
  ];

  const backdropsSliders = [
    ...batchOfImages.backdrops.data.map((item) => (
      <img
        style={{ width: "100%", aspectRatio: "16/9" }}
        src={`${images?.base_url}${images?.backdrop_sizes[2]}${item.file_path}`}
      />
    )),
    batchOfImages.backdrops.count > batchOfImages.backdrops.data.length ? (
      <p>see more</p>
    ) : null,
  ];
  return (
    <TabsCustom
      tabPanelStyle={{ overflow: "hidden", padding: "1rem 0" }}
      tabList={[
        {
          label: "Posters",
          tabPanel: (
            <CustomSwiper
              effect="cards"
              pagination={{ clickable: true }}
              sliders={posterSliders}
              style={{ width: "300px", overflow: "visible" }}
            />
          ),
        },
        {
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
        },
        null,
        {
          label: "Backdrops",
          tabPanel: (
            <CustomSwiper
              pagination={{ clickable: true }}
              cssMode
              sliders={backdropsSliders}
            />
          ),
        },
      ]}
    />
  );
};

export default MovieSerieMediaTabs;
