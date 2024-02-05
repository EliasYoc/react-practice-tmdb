import { useEffect } from "react";

const useIntersectionObserver = ({
  provideElementsToObserve,
  onIntersect,
  provideOptions,
}) => {
  useEffect(() => {
    const elementOrElements = provideElementsToObserve();
    const options = provideOptions();
    const observer = new IntersectionObserver(onIntersect, options);

    if (Array.isArray(Array.from(elementOrElements))) {
      elementOrElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      observer.observe(elementOrElements);
    }

    return () => {
      observer.disconnect();
    };
  }, [provideOptions, provideElementsToObserve, onIntersect]);
};

export default useIntersectionObserver;
