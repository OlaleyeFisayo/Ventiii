type TailwindBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<TailwindBreakpoint, number> = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536,
};

export function useMobileBreakpoint(breakpoint: TailwindBreakpoint = "md") {
  const isMobile = ref(false);
  const windowWidth = ref(0);

  const checkBreakpoint = () => {
    const width = window.innerWidth;
    windowWidth.value = width;
    isMobile.value = width < breakpoints[breakpoint];
  };

  if (import.meta.client) {
    checkBreakpoint();

    const handleResize = () => {
      checkBreakpoint();
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    onUnmounted(() => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    });
  }

  return {
    isMobile: readonly(isMobile),
    windowWidth: readonly(windowWidth),
    breakpointValue: breakpoints[breakpoint],
  };
}
