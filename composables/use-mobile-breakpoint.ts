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

  // Only run on client side
  if (import.meta.client) {
    // Set initial value
    checkBreakpoint();

    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkBreakpoint();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    });
  }

  return {
    isMobile: readonly(isMobile),
    windowWidth: readonly(windowWidth),
    breakpointValue: breakpoints[breakpoint],
  };
}
