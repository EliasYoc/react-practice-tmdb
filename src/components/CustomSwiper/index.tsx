import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
// Import Swiper styles (if you need more styles or swiper modules please import them here)
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, EffectCards, Autoplay, Mousewheel } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

// import "./styles.css";

interface ICustomSwiperProps extends SwiperOptions, SwiperProps {
  sliders: (JSX.Element | string | null | undefined)[];
  swiperSlideStyle?: React.CSSProperties;
}

/**
 *
 *https://swiperjs.com/react
 * this component can be used to display a list of elements, this component has classnames "swiper" and "swiper-slide" for styling
 *
 * @param {array} sliders a list of screens (elements or strings) to display in the swiper, if you pass a null or undefined item it will not display
 * @returns {JSX.Element}
 */
const CustomSwiper = ({
  sliders = [],
  swiperSlideStyle,
  ...rest
}: ICustomSwiperProps) => {
  return (
    <Swiper
      // if you want to add more modules please add them here
      modules={[Pagination, EffectCards, Autoplay, Mousewheel]}
      {...rest}
    >
      {sliders.map((slider, index) => {
        return slider ? (
          <SwiperSlide style={swiperSlideStyle} key={index}>
            {slider}
          </SwiperSlide>
        ) : null;
      })}
    </Swiper>
  );
};

export default CustomSwiper;
