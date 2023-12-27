export const detectAvailableViewTransition = (cb: () => void) => {
  if (!document.startViewTransition) {
    cb();
    return;
  }
  document.startViewTransition(() => {
    cb();
  })
}