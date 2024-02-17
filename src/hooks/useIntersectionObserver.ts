import { useEffect } from "react";

interface IntersectionObserverProps {
  onIntersect: IntersectionObserverCallback;
  provideElementsToObserve: () =>
    | HTMLElement[]
    | NodeListOf<HTMLElement>
    | HTMLCollectionOf<HTMLElement>;
  provideOptions: () => IntersectionObserverInit;
}
const useIntersectionObserver = ({
  provideElementsToObserve,
  onIntersect,
  provideOptions,
}: IntersectionObserverProps) => {
  useEffect(() => {
    const providedElements = provideElementsToObserve();
    
    if (
      !(Array.isArray(providedElements) ||
      providedElements instanceof NodeList ||
      providedElements instanceof HTMLCollection)
    ) throw new Error("provideElementsToObserve must return an array of elements or NodeList or HTMLCollection");
    
      const elements = Array.from(providedElements)
      const options = provideOptions();
      const observer = new IntersectionObserver(onIntersect, options);
      elements.forEach((element) => {
        observer.observe(element);
      });

    return () => {
      observer.disconnect();
    };
  }, [provideOptions, provideElementsToObserve, onIntersect]);
};

export default useIntersectionObserver;
