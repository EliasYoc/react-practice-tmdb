export const detectAvailableViewTransition = (cb: () => void) => {
  if (!document.startViewTransition) {
    cb();
    return;
  }
  return document.startViewTransition(() => {
    cb();
  });
};

export const formatDate = (
  locales: string | string[],
  options?: Intl.DateTimeFormatOptions,
  date?: number | Date
) => {
  const formattedDate = Intl.DateTimeFormat(locales, {
    timeZone: "UTC",
    ...options,
  }).format(date);

  return formattedDate;
};

export const getAverageColor = (average: number) => {
  if (average >= 8) return "#0ece2e";
  if (average >= 6) return "#90f366";
  if (average >= 4) return "#f2e176";
  if (average >= 2) return "#ff8746";
  if (average >= 0) return "#fb4b4b";
  return "#3e98c7";
};

export const chunkArray = <T>(array: T[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const mediaQueries = {
  sm: "(max-width: 640px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1024px)",
  xl: "(max-width: 1280px)",
  xxl: "(max-width: 1536px)",
};

export const makeViewTransition = (cb: () => void) => {
  if (!document.startViewTransition) {
    cb();
    return;
  }
  return document.startViewTransition(cb);
};
