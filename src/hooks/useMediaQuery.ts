import { useEffect, useMemo, useState } from "react";

export const useMediaQuery = (mediaQuery: string) => {
  const mediaQueryList = useMemo(() => window.matchMedia(mediaQuery), [mediaQuery]);

  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [mediaQueryList]);

  return matches;
};
