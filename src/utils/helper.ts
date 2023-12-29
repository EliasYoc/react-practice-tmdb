export const detectAvailableViewTransition = (cb: () => void) => {
  if (!document.startViewTransition) {
    cb();
    return;
  }
  document.startViewTransition(() => {
    cb();
  });
};

export const formatDate = (
  locales: string | string[],
  options?: Intl.DateTimeFormatOptions,
  date?: number | Date
) =>
  Intl.DateTimeFormat(locales, {
    timeZone: "UTC",
    ...options,
  }).format(date);


  export const getAverageColor = (average:number) => {
    if (average <= 2) return "#fb4b4b";
    if (average <= 4) return "#ff8746";
    if (average <= 6) return "#f2e176";
    if (average <= 8) return "#90f366";
    if (average <= 10) return "#0ece2e";
    return "#3e98c7";
  };